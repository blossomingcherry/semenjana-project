-- ============================================================
--  SEMENJANA - Database Schema
--  Jalankan file ini di MySQL / MariaDB / phpMyAdmin
-- ============================================================

CREATE DATABASE IF NOT EXISTS semenjana_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE semenjana_db;

-- ──────────────────────────────────────────────────────────
--  TABEL: menu_items
--  Menyimpan semua item menu beserta link foto
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS menu_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150)  NOT NULL,
  price       INT           NOT NULL DEFAULT 0,
  cat         ENUM('reguler','premium','hitam','minuman','panas') NOT NULL DEFAULT 'reguler',
  img         VARCHAR(10)   NOT NULL DEFAULT '🍚'   COMMENT 'Emoji fallback',
  photo_url   VARCHAR(500)  NULL     DEFAULT NULL   COMMENT 'URL foto upload (misal: /uploads/foto.jpg)',
  description TEXT          NULL,
  is_fav      TINYINT(1)    NOT NULL DEFAULT 0      COMMENT '1 = favorit / best seller',
  is_active   TINYINT(1)    NOT NULL DEFAULT 1      COMMENT '1 = tampil di menu',
  created_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  TABEL: orders
--  Menyimpan header pesanan
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id            VARCHAR(20)   PRIMARY KEY               COMMENT 'Format: SJN-xxxxxx',
  table_number  VARCHAR(10)   NOT NULL,
  customer_name VARCHAR(100)  NOT NULL DEFAULT 'Pelanggan',
  total         INT           NOT NULL DEFAULT 0,
  method        ENUM('kasir','qris','transfer') NOT NULL DEFAULT 'kasir',
  status        ENUM('pending','preparing','ready','done') NOT NULL DEFAULT 'pending',
  order_time    TIME          NOT NULL,
  order_date    DATE          NOT NULL,
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  TABEL: order_items
--  Detail item per pesanan (relasi ke orders & menu_items)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS order_items (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  order_id    VARCHAR(20) NOT NULL,
  menu_id     INT         NOT NULL,
  menu_name   VARCHAR(150) NOT NULL  COMMENT 'Snapshot nama saat pesan',
  menu_img    VARCHAR(10)  NOT NULL  COMMENT 'Snapshot emoji saat pesan',
  price       INT          NOT NULL,
  qty         INT          NOT NULL DEFAULT 1,
  subtotal    INT          NOT NULL GENERATED ALWAYS AS (price * qty) STORED,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (menu_id)  REFERENCES menu_items(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  TABEL: uploads
--  Log semua foto yang diupload
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS uploads (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  filename    VARCHAR(255) NOT NULL,
  original    VARCHAR(255) NOT NULL,
  url         VARCHAR(500) NOT NULL,
  size_bytes  INT          NOT NULL DEFAULT 0,
  menu_id     INT          NULL,
  uploaded_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (menu_id) REFERENCES menu_items(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ──────────────────────────────────────────────────────────
--  DATA AWAL: semua menu dari aplikasi
-- ──────────────────────────────────────────────────────────
INSERT INTO menu_items (name, price, cat, img, description, is_fav) VALUES
-- Reguler
('Ketan susu (original)',          6000,  'reguler', '🍚', 'Ketan putih lembut dengan susu kental manis', 0),
('Ketan susu keju',                8000,  'reguler', '🧀', 'Ketan susu tabur keju parut gurih', 1),
('Ketan susu Coklat',              10000, 'reguler', '🍫', 'Ketan susu dengan saus coklat lembut', 0),
('Ketan susu keju Coklat',         12000, 'reguler', '🍫', 'Perpaduan keju dan coklat di atas ketan', 0),
('Ketan susu coklat crunchy',      10000, 'reguler', '🍪', 'Ketan coklat dengan topping renyah', 0),
('Ketan susu keju Coklat crunchy', 12000, 'reguler', '🍪', 'Kombinasi keju coklat dan crunch premium', 1),
('Ketan susu matcha',              10000, 'reguler', '🍵', 'Ketan susu dengan matcha premium', 0),
('Ketan susu keju matcha',         12000, 'reguler', '🍵', 'Matcha lembut bertabur keju parut', 1),
('Ketan susu tiramisu',            10000, 'reguler', '☕', 'Ketan dengan cita rasa tiramisu', 0),
('Ketan susu keju tiramisu',       12000, 'reguler', '☕', 'Tiramisu + keju, sempurna!', 0),
('Ketan susu oreo',                10000, 'reguler', '🍪', 'Ketan susu tabur remah oreo', 0),
('Ketan susu keju oreo',           12000, 'reguler', '🍪', 'Oreo crumble dan keju di atas ketan', 1),
('Ketan susu choco crunch',        10000, 'reguler', '🌾', 'Ketan susu dengan cereal choco crunchy', 0),
('Ketan susu keju choco crunch',   12000, 'reguler', '🌾', 'Choco crunch dan keju, double nikmat', 0),
('Ketan susu keju kacang',         12000, 'reguler', '🥜', 'Ketan susu keju tabur kacang gurih', 0),
('Ketan susu keju kacang coklat',  15000, 'reguler', '🥜', 'Triple topping: keju, kacang, coklat', 0),
('Ketan susu regal',               10000, 'reguler', '🍪', 'Ketan susu dengan biskuit regal renyah', 0),
('Ketan susu keju regal',          12000, 'reguler', '🍪', 'Regal + keju, favorit pelanggan!', 1),
('Ketan abon',                     10000, 'reguler', '🍚', 'Ketan gurih dengan abon sapi lezat', 0),
('Ketan bubuk',                    8000,  'reguler', '🍚', 'Ketan dengan taburan bubuk coklat', 0),
('Ketan bakar',                    12000, 'reguler', '🔥', 'Ketan dibakar dengan aroma wangi', 0),
-- Premium
('Manggo sticky rice',     15000, 'premium', '🥭', 'Ketan hitam dengan potongan mangga harum manis', 0),
('Biscuit party',          15000, 'premium', '🎉', 'Ketan hitam topping regal, chococrunch & oreo', 0),
('Banana sticky rice',     15000, 'premium', '🍌', 'Ketan hitam dengan pisang cavendish segar', 0),
('Strawberry sticky rice', 15000, 'premium', '🍓', 'Ketan hitam dengan strawberry segar', 1),
('Alpukat sticky rice',    20000, 'premium', '🥑', 'Ketan hitam dengan alpukat creamy', 0),
('Durian sticky rice',     20000, 'premium', '🌿', 'Ketan hitam dengan durian premium pilihan', 1),
('Tansu Buah (3 buah)',    20000, 'premium', '🍱', 'Paket 3 buah pilihan di atas ketan hitam', 0),
('Topping Ice cream',      5000,  'premium', '🍦', 'Tambahan ice cream vanilla untuk semua menu', 0),
-- Ketan Hitam
('Matcho',        15000, 'hitam', '🍵', 'Ketan hitam topping glaze matcha dan crumble oreo', 1),
('TanSuKe',       10000, 'hitam', '🍚', 'Ketan hitam, susu kental manis dan keju', 0),
('Biscuit Party', 18000, 'hitam', '🎉', 'Ketan hitam topping regal, chococrunch dan crumble oreo', 0),
('Black Manggo',  22000, 'hitam', '🥭', 'Ketan hitam topping buah mangga harum manis', 1),
('AvoBerry',      20000, 'hitam', '🥑', 'Ketan hitam topping buah alpukat dan strawberry', 0),
('Banana Love',   20000, 'hitam', '🍌', 'Ketan hitam topping pisang cavendish dan strawberry', 0),
-- Minuman Es
('Es kopi susu brownsugar', 12000, 'minuman', '☕', 'Espresso dengan brown sugar dan susu segar', 1),
('Es thai tea',             8000,  'minuman', '🧋', 'Teh Thailand dengan susu, manis dan segar', 1),
('Es lemon tea',            8000,  'minuman', '🍋', 'Teh lemon segar dan menyegarkan', 0),
('Es Matcha',               8000,  'minuman', '🍵', 'Matcha es dengan susu creamy', 1),
('Es coklat',               8000,  'minuman', '🍫', 'Coklat dingin yang lezat', 0),
('Es teh',                  4000,  'minuman', '🍵', 'Teh manis dingin classic', 0),
('Air es',                  2000,  'minuman', '💧', 'Air es segar', 0),
('Air mineral',             2500,  'minuman', '💧', 'Air mineral kemasan', 0),
-- Panas
('Kopi Tubruk Hitam', 8000,  'panas', '☕', 'Kopi tubruk hitam pekat khas warung', 1),
('Kopi Tubruk susu',  10000, 'panas', '☕', 'Kopi tubruk dengan susu kental', 0),
('Teh tubruk',        5000,  'panas', '🍵', 'Teh tubruk hangat', 0),
('Wedang uwuh',       8000,  'panas', '🌿', 'Minuman herbal rempah khas Yogyakarta', 0),
('Coklat panas',      6000,  'panas', '🍫', 'Coklat hangat creamy', 1);

-- ──────────────────────────────────────────────────────────
--  INDEX untuk performa query
-- ──────────────────────────────────────────────────────────
CREATE INDEX idx_menu_cat    ON menu_items (cat);
CREATE INDEX idx_menu_active ON menu_items (is_active);
CREATE INDEX idx_order_table ON orders (table_number);
CREATE INDEX idx_order_date  ON orders (order_date);
CREATE INDEX idx_order_status ON orders (status);
