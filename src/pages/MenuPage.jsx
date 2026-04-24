import { useContext } from "react";
import { Ctx } from "../context/AppContext";
import { CATS, HITAM_CARDS } from "../data/menuData";

// Helper: tampilkan foto jika ada, fallback ke emoji
function MenuImg({ item, size = 58, fontSize = 30 }) {
  if (item.photo_url) {
    return (
      <img
        src={item.photo_url}
        alt={item.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
      />
    );
  }
  return <span style={{ fontSize }}>{item.img}</span>;
}

export default function MenuPage() {
  const { s, d } = useContext(Ctx);
  const items = s.activeCat === "all" ? s.menuItems : s.menuItems.filter(m => m.cat === s.activeCat);
  const total = s.cart.reduce((a, i) => a + i.price * i.qty, 0);
  const qty   = s.cart.reduce((a, i) => a + i.qty, 0);
  const getQ  = id => { const c = s.cart.find(i => i.id === id); return c ? c.qty : 0; };

  return (
    <div style={{ paddingBottom: 80 }}>
      <div className="ck-s"/>

      {/* Hero */}
      <div className="hero">
        <div className="hero-t">KETAN SUSU <em>&amp;</em> KOPI</div>
        <div style={{ fontFamily: "'Oswald',sans-serif", fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: 3, marginTop: 1 }}>
          <span style={{ color: "var(--R2)" }}>S</span>EMENJANA
        </div>
        <div className="hero-s">🪑 Meja {s.tableNumber} · 👤 {s.customerName}</div>
        <div className="hero-ig">📸 @semenjana_ketan.kopi</div>
      </div>
      <div className="ck-s"/>

      {/* Ketan Hitam Showcase */}
      <div className="kh-sec">
        <div className="sec-hd">
          <h2>KETAN HITAM</h2>
          <div className="sec-hd-ln"/>
          <div className="sec-hd-tag">MENU SPESIAL</div>
        </div>
        <div className="kh-grid">
          {HITAM_CARDS.map((h, i) => {
            const mi = s.menuItems.find(m => m.name.toLowerCase() === h.name.toLowerCase() && m.cat === "hitam");
            return (
              <div className="kh-card" key={i}>
                <div className="kh-img" style={{ background: `linear-gradient(135deg,${h.bg}33,${h.bg}66)` }}>
                  {mi?.photo_url
                    ? <img src={mi.photo_url} alt={h.name}/>
                    : <span className="kh-emoji">{h.emoji}</span>
                  }
                  <div className="kh-badge">Rp {(h.price / 1000).toFixed(0)}k</div>
                </div>
                <div className="kh-body">
                  <div className="kh-name">{h.name}</div>
                  <div className="kh-desc">{h.desc}</div>
                  <button className="kh-add" onClick={() => {
                    if (mi) d({ type: "ADD_CART", item: mi });
                    d({ type: "NOTIF", msg: `✅ ${h.name} ditambahkan!` });
                  }}>+ Tambah</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Kategori */}
      <div className="cat-sc">
        {CATS.map(c => (
          <button
            key={c.id}
            className={`cat-btn ${s.activeCat === c.id ? "on" : ""}`}
            onClick={() => d({ type: "SET_CAT", v: c.id })}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="m-list">
        {items.map(item => {
          const q = getQ(item.id);
          return (
            <div className="m-card" key={item.id}>
              <div className="m-img">
                <MenuImg item={item}/>
                {item.fav && <span className="m-fav">⭐</span>}
              </div>
              <div className="m-body">
                <div className="m-name">{item.name}</div>
                <div className="m-desc">{item.desc}</div>
                <div className="m-price">Rp {item.price.toLocaleString("id-ID")}</div>
              </div>
{q === 0 ? (
  <div className="add-c" onClick={() => {
    d({ type: "ADD_CART", item });
    d({ type: "NOTIF", msg: `✅ ${item.name} ditambahkan!` });
  }}>+</div>
) : (
  <div className="qc">
    <div className="qb-d" onClick={() => d({ type: "UPD_QTY", id: item.id, qty: q - 1 })}>−</div>
    <span className="qn">{q}</span>
    <div className="qb" onClick={() => d({ type: "ADD_CART", item })}>+</div>
  </div>
)}
            </div>
          );
        })}
      </div>

      {/* Float Cart Button */}
      {qty > 0 && (
        <button className="fcart" onClick={() => d({ type: "SET_VIEW", v: "cart" })}>
          <span className="bge">{qty}</span>
          <div className="fc-in">
            <div className="fc-sub">{qty} item · buka keranjang</div>
            <div className="fc-pr">Rp {total.toLocaleString("id-ID")}</div>
          </div>
          <span>→</span>
        </button>
      )}
    </div>
  );
}
