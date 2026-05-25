import { useState, useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function PaymentPage() {
  const { s, d } = useContext(Ctx);
  const [loading, setLoading] = useState(false);

  const total = s.cart.reduce((a, i) => a + i.price * i.qty, 0);

  const confirm = async () => {
    const orderId = `SJN-${Date.now().toString().slice(-6)}`;
    const orderData = {
      id:       orderId,
      table:    s.tableNumber,
      customer: s.customerName || "Pelanggan",
      items:    s.cart.map(i => ({
        id:    i.id,
        name:  i.name,
        img:   i.img || "🍚",
        price: i.price,
        qty:   i.qty,
      })),
      total,
      method: "kasir",
    };

    setLoading(true);
    try {
      // Simpan ke database
      const res = await fetch("http://localhost:3001/api/orders", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(orderData),
      });
      const data = await res.json();
      console.log("Order saved:", data);
    } catch (e) {
      console.warn("Gagal simpan ke DB:", e.message);
    } finally {
      setLoading(false);
    }

    // Update state React untuk tampilan receipt
    d({ type:"PLACE_ORDER", total, method:"kasir", orderId });
  };

  return (
    <div className="pg">
      <div className="pg-title">🧾 Konfirmasi Pesanan</div>
      <div style={{ fontSize:12, color:"var(--G)", marginBottom:16 }}>
        🪑 Meja {s.tableNumber} · 👤 {s.customerName}
      </div>

      {/* Ringkasan item */}
      {s.cart.map(item => (
        <div className="ci" key={item.id}>
          <div className="ci-img">
            {item.photo_url
              ? <img src={item.photo_url} alt={item.name}/>
              : item.img}
          </div>
          <div style={{ flex:1 }}>
            <div className="ci-n">{item.name}</div>
            <div className="ci-p">
              Rp {item.price.toLocaleString("id-ID")} × {item.qty}
            </div>
          </div>
          <div style={{ fontWeight:800, color:"var(--B)", fontSize:13 }}>
            Rp {(item.price * item.qty).toLocaleString("id-ID")}
          </div>
        </div>
      ))}

      {/* Total */}
      <div className="tot-box" style={{ marginTop:14 }}>
        <div className="tot-m">
          <span>Total</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <button
        className="btn-b"
        onClick={confirm}
        disabled={loading}
        style={{ marginTop:16 }}
      >
        {loading ? "⏳ Memproses..." : "✅ Konfirmasi Pesanan"}
      </button>
      <button
        className="btn-sm-g"
        onClick={() => d({ type:"SET_VIEW", v:"cart" })}
      >
        ← Kembali ke Keranjang
      </button>
    </div>
  );
}