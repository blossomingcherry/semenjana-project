import { useState, useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function QRPage() {
  const { d } = useContext(Ctx);
  const [table, setTable] = useState("");
  const [name, setName]   = useState("");
  const [showAdm, setShowAdm] = useState(false);
  const [pw, setPw] = useState("");

  const goUser = () => {
    if (!table.trim()) return;
    d({ type:"SET_TABLE", v:table });
    d({ type:"SET_NAME",  v:name || "Pelanggan" });
    d({ type:"SET_ROLE",  v:"user" });
  };

  const goAdmin = () => {
    if (pw === "semenjana123") d({ type:"SET_ROLE", v:"admin" });
    else d({ type:"NOTIF", msg:"❌ Password salah!" });
  };

  return (
    <div className="qr-page">
      <div className="ck"/>
      <div className="qr-top">
        <div className="qr-main-title">KETAN SUSU &amp; KOPI</div>
        <div className="qr-semenjana"><em>S</em>EMENJANA</div>
        <div className="qr-ig">📸 @semenjana_ketan.kopi</div>
      </div>

      <div className="qr-card">
        {!showAdm ? (
          <>
            <input className="inp" placeholder="Nomor Meja (wajib)" value={table} onChange={e => setTable(e.target.value)}/>
            <input className="inp" placeholder="Nama kamu (opsional)" value={name} onChange={e => setName(e.target.value)}/>
            <button className="btn-b" onClick={goUser} disabled={!table.trim()}>
              🍚 Masuk &amp; Lihat Menu
            </button>
          </>
        ) : (
          <>
            <h3 style={{ fontFamily:"'Oswald',sans-serif", fontSize:18, color:"var(--B)", marginBottom:12 }}>
              🔐 Login Admin
            </h3>
            <input
              className="inp" type="password" placeholder="Password admin"
              value={pw} onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key==="Enter" && goAdmin()}
            />
            <button className="btn-b" onClick={goAdmin}>Masuk sebagai Admin</button>
            <button className="btn-r" onClick={() => setShowAdm(false)}>← Kembali</button>
          </>
        )}
      </div>

      {!showAdm && (
        <div className="admin-link">
          <button onClick={() => setShowAdm(true)}>Login Admin / Kasir</button>
        </div>
      )}
      <div style={{ height:20 }}/>
      <div className="ck"/>
    </div>
  );
}