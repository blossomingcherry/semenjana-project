const express  = require("express");
const cors     = require("cors");
const multer   = require("multer");
const mysql2   = require("mysql2/promise");
const path     = require("path");
const fs       = require("fs");

const app  = express();
const PORT = process.env.PORT || 3001;

// ── MIDDLEWARE ────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Buat folder uploads kalau belum ada
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ── DATABASE ──────────────────────────────────────────────
// Sesuaikan dengan konfigurasi MySQL kamu
const db = mysql2.createPool({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "root",
  password: process.env.DB_PASS     || "",
  database: process.env.DB_NAME     || "semenjana",
  waitForConnections: true,
  connectionLimit: 10,
});

// ── MULTER (upload foto) ──────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename:    (req, file, cb) => {
    const ext  = path.extname(file.originalname);
    const name = `menu_${Date.now()}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // maks 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Hanya file JPG / PNG / WebP yang diizinkan"));
  },
});

// ── HELPER ───────────────────────────────────────────────
const ok  = (res, data)    => res.json({ success: true, data });
const err = (res, msg, code=400) => res.status(code).json({ success: false, message: msg });

// ── ROUTE: UPLOAD FOTO ────────────────────────────────────
// POST /api/upload
// Body: multipart/form-data  field: "foto"
// Return: { url: "/uploads/menu_xxx.jpg" }
app.post("/api/upload", upload.single("foto"), async (req, res) => {
  try {
    if (!req.file) return err(res, "File tidak ditemukan");
    const url = `/uploads/${req.file.filename}`;

    // Simpan log ke tabel uploads
    await db.execute(
      "INSERT INTO uploads (filename, original, url, size_bytes) VALUES (?,?,?,?)",
      [req.file.filename, req.file.originalname, url, req.file.size]
    );

    ok(res, { url, filename: req.file.filename });
  } catch (e) {
    console.error(e);
    err(res, "Gagal upload: " + e.message, 500);
  }
});

// ── ROUTE: MENU ───────────────────────────────────────────
// GET /api/menu  — ambil semua menu aktif
app.get("/api/menu", async (req, res) => {
  try {
    // ✅ Sesudah (pakai backtick di desc)
const [rows] = await db.execute(
  `SELECT id, name, price, cat, img, photo_url,
          description AS \`desc\`, is_fav AS fav
   FROM menu_items WHERE is_active = 1
   ORDER BY cat, name`
);
    // Sesuaikan nama field agar cocok dengan state React
    const items = rows.map(r => ({
      ...r,
      fav: !!r.fav,
    }));
    ok(res, items);
  } catch (e) {
    err(res, e.message, 500);
  }
});

// GET /api/menu/:id — ambil 1 menu
app.get("/api/menu/:id", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM menu_items WHERE id = ?", [req.params.id]);
    if (!rows.length) return err(res, "Menu tidak ditemukan", 404);
    ok(res, rows[0]);
  } catch (e) {
    err(res, e.message, 500);
  }
});

// POST /api/menu — tambah menu baru
app.post("/api/menu", async (req, res) => {
  try {
    const { name, price, cat, img, desc, fav, photo_url } = req.body;
    if (!name || !price) return err(res, "Nama dan harga wajib diisi");

    const [result] = await db.execute(
      `INSERT INTO menu_items (name, price, cat, img, description, is_fav, photo_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, price, cat || "reguler", img || "🍚", desc || "", fav ? 1 : 0, photo_url || null]
    );
    ok(res, { id: result.insertId, name, price, cat, img, desc, fav, photo_url });
  } catch (e) {
    err(res, e.message, 500);
  }
});

// PUT /api/menu/:id — update menu
app.put("/api/menu/:id", async (req, res) => {
  try {
    const { name, price, cat, img, desc, fav, photo_url } = req.body;
    await db.execute(
      `UPDATE menu_items
       SET name=?, price=?, cat=?, img=?, description=?, is_fav=?, photo_url=?, updated_at=NOW()
       WHERE id=?`,
      [name, price, cat, img, desc || "", fav ? 1 : 0, photo_url || null, req.params.id]
    );
    ok(res, { id: parseInt(req.params.id), name, price, cat, img, desc, fav, photo_url });
  } catch (e) {
    err(res, e.message, 500);
  }
});

// DELETE /api/menu/:id — hapus (soft delete)
app.delete("/api/menu/:id", async (req, res) => {
  try {
    await db.execute("UPDATE menu_items SET is_active=0 WHERE id=?", [req.params.id]);
    ok(res, { id: parseInt(req.params.id) });
  } catch (e) {
    err(res, e.message, 500);
  }
});

// ── ROUTE: ORDERS ─────────────────────────────────────────
// GET /api/orders  — semua pesanan (admin)
app.get("/api/orders", async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.*,
              JSON_ARRAYAGG(
                JSON_OBJECT(
                  'id',   oi.menu_id,
                  'name', oi.menu_name,
                  'img',  oi.menu_img,
                  'price',oi.price,
                  'qty',  oi.qty
                )
              ) AS items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       GROUP BY o.id
       ORDER BY o.created_at DESC`
    );
    const parsed = orders.map(o => ({
      ...o,
      items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
      time:  o.order_time,
      date:  o.order_date,
      table: o.table_number,
      customer: o.customer_name,
    }));
    ok(res, parsed);
  } catch (e) {
    err(res, e.message, 500);
  }
});

// GET /api/orders/table/:no — pesanan per meja (user)
app.get("/api/orders/table/:no", async (req, res) => {
  try {
    const [orders] = await db.execute(
      `SELECT o.id, o.status, o.total, o.method,
              o.order_time AS time, o.order_date AS date,
              JSON_ARRAYAGG(
                JSON_OBJECT('name',oi.menu_name,'img',oi.menu_img,'qty',oi.qty,'price',oi.price)
              ) AS items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.table_number = ? AND o.order_date = CURDATE()
       GROUP BY o.id
       ORDER BY o.created_at DESC`,
      [req.params.no]
    );
    const parsed = orders.map(o => ({
      ...o,
      items: typeof o.items === "string" ? JSON.parse(o.items) : o.items,
    }));
    ok(res, parsed);
  } catch (e) {
    err(res, e.message, 500);
  }
});

// POST /api/orders — buat pesanan baru
app.post("/api/orders", async (req, res) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    const { id, table, customer, items, total, method } = req.body;
    const now  = new Date();
    const time = now.toTimeString().slice(0, 5);
    const date = now.toISOString().slice(0, 10);

    await conn.execute(
      `INSERT INTO orders (id, table_number, customer_name, total, method, status, order_time, order_date)
       VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`,
      [id, table, customer, total, method, time, date]
    );

    for (const item of items) {
      await conn.execute(
        `INSERT INTO order_items (order_id, menu_id, menu_name, menu_img, price, qty)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, item.id, item.name, item.img || "🍚", item.price, item.qty]
      );
    }

    await conn.commit();
    ok(res, { id, status: "pending" });
  } catch (e) {
    await conn.rollback();
    err(res, e.message, 500);
  } finally {
    conn.release();
  }
});

// PATCH /api/orders/:id/status — update status pesanan
app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ["pending", "preparing", "ready", "done"];
    if (!valid.includes(status)) return err(res, "Status tidak valid");

    await db.execute("UPDATE orders SET status=? WHERE id=?", [status, req.params.id]);
    ok(res, { id: req.params.id, status });
  } catch (e) {
    err(res, e.message, 500);
  }
});

// ── ROUTE: SALES (ringkasan) ──────────────────────────────
// GET /api/sales?days=7
app.get("/api/sales", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const [rows] = await db.execute(
      `SELECT order_date AS date,
              SUM(total)  AS rev,
              COUNT(*)    AS orders
       FROM orders
       WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       GROUP BY order_date
       ORDER BY order_date ASC`,
      [days]
    );
    ok(res, rows);
  } catch (e) {
    err(res, e.message, 500);
  }
});

// ── START SERVER ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Semenjana backend jalan di http://localhost:${PORT}`);
});
