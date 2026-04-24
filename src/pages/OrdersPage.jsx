import { useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function OrdersPage() {
  const { s } = useContext(Ctx);
  const mine = s.orders.filter(o => o.table === s.tableNumber);
  const prog = { pending: 15, preparing: 55, ready: 90, done: 100 };
  const lbl  = { pending: "⏳ Menunggu", preparing: "👨‍🍳 Dimasak", ready: "🔔 Siap Diambil!", done: "✅ Selesai" };

  if (!mine.length) return (
    <div className="pg">
      <div className="empty">
        <span className="empty-e">📋</span>
        <p>Belum ada pesanan untuk Meja {s.tableNumber}</p>
      </div>
    </div>
  );

  return (
    <div className="pg">
      <div className="pg-title">📋 Status Pesanan</div>
      {mine.map(ord => (
        <div className="os-card" key={ord.id}>
          <div className="os-hd">
            <div>
              <div style={{ fontWeight: 800, fontSize: 12, color: "var(--B)" }}>{ord.id}</div>
              <div style={{ fontSize: 11, color: "var(--G)" }}>{ord.date} · {ord.time}</div>
            </div>
            <span className={`status-${ord.status}`}>{lbl[ord.status]}</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--G)", marginBottom: 6 }}>
            {ord.items.map(i => `${i.img} ${i.name} ×${i.qty}`).join(" · ")}
          </div>
          <div className="dv"/>
          <div style={{ fontWeight: 800, color: "var(--R)", fontFamily: "'Oswald',sans-serif", fontSize: 16 }}>
            Rp {ord.total?.toLocaleString("id-ID")}
          </div>
          <div className="prog">
            <div className="prog-f" style={{ width: `${prog[ord.status]}%` }}/>
          </div>
        </div>
      ))}
    </div>
  );
}
