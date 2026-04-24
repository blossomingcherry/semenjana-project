import { useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function ReceiptPage() {
  const { s, d } = useContext(Ctx);
  const ord = s.lastOrder;

  const download = () => {
    const txt = [
      "==============================",
      "         SEMENJANA",
      "    KETAN SUSU & KOPI",
      "==============================",
      `ID    : ${ord.id}`,
      `Tgl   : ${ord.date}  ${ord.time}`,
      `Meja  : ${ord.table}`,
      `Nama  : ${ord.customer}`,
      `Bayar : ${ord.method === "kasir" ? "Kasir" : ord.method === "qris" ? "QRIS" : "Transfer Bank"}`,
      "------------------------------",
      "PESANAN:",
      ...ord.items.map(i => `${i.name} x${i.qty}  Rp ${(i.price * i.qty).toLocaleString("id-ID")}`),
      "------------------------------",
      `TOTAL : Rp ${ord.total.toLocaleString("id-ID")}`,
      "==============================",
      "  Terima kasih sudah makan",
      "     di Semenjana! 😊",
      "  @semenjana_ketan.kopi",
      "==============================",
    ].join("\n");

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([txt], { type: "text/plain" }));
    a.download = `struk-${ord.id}.txt`;
    a.click();
    d({ type: "NOTIF", msg: "📥 Struk diunduh!" });
  };

  if (!ord) return (
    <div className="pg">
      <div className="empty"><span className="empty-e">📋</span><p>Tidak ada pesanan</p></div>
    </div>
  );

  return (
    <div className="pg">
      <div className="rcpt">
        <div className="rcpt-hdr">
          <div className="ck-s"/>
          <div style={{ padding: "14px 14px 10px" }}>
            <div className="rcpt-brand"><em>S</em>EMENJANA</div>
            <div style={{ fontSize: 11, opacity: 0.6, marginTop: 1 }}>KETAN SUSU &amp; KOPI</div>
            <div style={{ marginTop: 8 }}><span className="ok-chip">✅ Pesanan Diterima!</span></div>
          </div>
          <div className="ck-s"/>
        </div>

        <div className="rcpt-body">
          {[
            ["ID Pesanan", ord.id],
            ["Tanggal",    `${ord.date} · ${ord.time}`],
            ["Meja",       ord.table],
            ["Pelanggan",  ord.customer],
            ["Metode",     ord.method === "kasir" ? "💵 Kasir" : ord.method === "qris" ? "📱 QRIS" : "🏦 Transfer"],
          ].map(([k, v]) => (
            <div className="rcpt-row" key={k}><span>{k}</span><strong>{v}</strong></div>
          ))}
          <div style={{ height: 8 }}/>
          {ord.items.map((item, i) => (
            <div className="rcpt-row" key={i}>
              <span>{item.img} {item.name} ×{item.qty}</span>
              <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
            </div>
          ))}
          <div className="rcpt-tot">
            <span>TOTAL</span><span>Rp {ord.total.toLocaleString("id-ID")}</span>
          </div>
        </div>
        <div className="rcpt-ft">⭐ Terima kasih! Tag kami @semenjana_ketan.kopi 📸</div>
      </div>

      <button className="btn-b" onClick={download}>📥 Download Struk (.txt)</button>
      <button className="btn-r" onClick={() => d({ type: "SET_VIEW", v: "menu" })}>🍚 Pesan Lagi</button>
    </div>
  );
}
