# 🍚 SEMENJANA – Menu Digital & Kasir
> Ketan Susu & Kopi · @semenjana_ketan.kopi

---

## 📁 Struktur Folder

```
semenjana/
├── index.html                  ← entry HTML
├── package.json                ← dependencies frontend
├── vite.config.js              ← konfigurasi Vite
├── src/
│   ├── main.jsx                ← entry React
│   ├── App.jsx                 ← root komponen + routing
│   ├── context/
│   │   └── AppContext.jsx      ← global state (reducer)
│   ├── data/
│   │   └── menuData.js         ← data menu & kategori
│   ├── styles/
│   │   └── styles.js           ← semua CSS
│   ├── components/
│   │   ├── QRSvg.jsx           ← komponen QR code
│   │   ├── Notif.jsx           ← toast notifikasi
│   │   └── UserNav.jsx         ← bottom navigation user
│   └── pages/
│       ├── QRPage.jsx          ← halaman landing / login
│       ├── MenuPage.jsx        ← halaman menu pelanggan
│       ├── CartPage.jsx        ← keranjang belanja
│       ├── PaymentPage.jsx     ← pilih metode pembayaran
│       ├── ReceiptPage.jsx     ← struk pesanan
│       ├── OrdersPage.jsx      ← status pesanan (user)
│       └── AdminPanel.jsx      ← dashboard admin + upload foto
└── backend/
    ├── server.js               ← Express API + upload foto
    ├── package.json            ← dependencies backend
    └── schema.sql              ← struktur database MySQL
```

---

## 🚀 Cara Menjalankan

### 1. Setup Database MySQL

Buka **phpMyAdmin** atau MySQL terminal, jalankan:

```sql
SOURCE /path/ke/semenjana/backend/schema.sql;
```

Atau copy-paste isi file `schema.sql` ke phpMyAdmin → tab SQL → klik Go.

---

### 2. Setup Backend (Node.js)

```bash
cd semenjana/backend
npm install
```

Edit konfigurasi database di `server.js` (baris bagian `createPool`):

```js
const db = mysql2.createPool({
  host:     "localhost",
  user:     "root",       // ← username MySQL kamu
  password: "",           // ← password MySQL kamu
  database: "semenjana_db",
});
```

Jalankan server:

```bash
npm run dev    # development (pakai nodemon, auto-restart)
# atau
npm start      # production
```

Server jalan di → `http://localhost:3001`

---

### 3. Setup Frontend (React + Vite)

```bash
cd semenjana          # folder root (bukan backend)
npm install
npm run dev
```

Aplikasi jalan di → `http://localhost:5173`

---

## 📸 Fitur Foto Menu

### Cara Upload Foto (dari Admin Panel)

1. Login sebagai Admin (password: `semenjana123`)
2. Buka tab **Menu**
3. Klik tombol **+ Tambah Menu Baru** atau ✏️ edit menu yang ada
4. Di modal, klik kotak **📷 Klik untuk pilih foto menu**
5. Pilih file JPG / PNG (maks. 5MB)
6. Foto akan otomatis diupload ke server → URL tersimpan
7. Klik **Simpan**

### Foto disimpan di mana?
- File fisik: `backend/uploads/menu_xxxxx.jpg`
- URL yang tersimpan di DB: `/uploads/menu_xxxxx.jpg`
- Diakses via: `http://localhost:3001/uploads/menu_xxxxx.jpg`

### Jika tidak pakai backend
Foto tetap tampil sebagai **emoji** (fallback). Aplikasi tetap bisa berjalan tanpa backend — semua state disimpan di memory React.

---

## 🔑 Login

| Role   | Cara Masuk                                      |
|--------|-------------------------------------------------|
| User   | Isi Nomor Meja → Masuk & Lihat Menu             |
| Admin  | Klik "Login Admin / Kasir" → Password: `semenjana123` |

---

## 🛠 API Endpoint (Backend)

| Method | Endpoint                    | Fungsi                        |
|--------|-----------------------------|-------------------------------|
| GET    | `/api/menu`                 | Ambil semua menu aktif        |
| POST   | `/api/menu`                 | Tambah menu baru              |
| PUT    | `/api/menu/:id`             | Edit menu                     |
| DELETE | `/api/menu/:id`             | Hapus menu (soft delete)      |
| POST   | `/api/upload`               | Upload foto (multipart/form)  |
| GET    | `/api/orders`               | Semua pesanan (admin)         |
| GET    | `/api/orders/table/:no`     | Pesanan per meja (user)       |
| POST   | `/api/orders`               | Buat pesanan baru             |
| PATCH  | `/api/orders/:id/status`    | Update status pesanan         |
| GET    | `/api/sales?days=7`         | Data penjualan 7 hari         |

---

## 📦 Tech Stack

| Layer    | Teknologi                              |
|----------|----------------------------------------|
| Frontend | React 18, Vite, CSS-in-JS              |
| Backend  | Node.js, Express, Multer               |
| Database | MySQL / MariaDB                        |
| Upload   | Multer (lokal) — bisa diganti Cloudinary |

---

> Dibuat dengan ❤️ untuk Semenjana Ketan & Kopi
