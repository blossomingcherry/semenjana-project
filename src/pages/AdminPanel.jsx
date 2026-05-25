import { useState, useContext, useRef, useEffect } from "react";
import { Ctx } from "../context/AppContext";
import { CATS } from "../data/menuData";
import { addMenu, editMenu, deleteMenu, updateOrderStatus, getOrders } from "../api";

const API_URL = "http://localhost:3001";

export default function AdminPanel() {
  const { s, d } = useContext(Ctx);
  const [tab, setTab]       = useState("orders");
  const [modal, setModal]   = useState(null);
  const [form, setForm]     = useState({ name:"", price:"", cat:"reguler", img:"🍚", desc:"", fav:false, photo_url:"" });
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading]   = useState(false);
  const [filterStatus, setFilterStatus] = useState("all"); // Filter state untuk status pesanan
  const fileRef = useRef();

  // Load pesanan saat pertama buka + auto refresh tiap 3 detik
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        d({ type:"SET_ORDERS", orders });
      } catch(e) { console.warn(e); }
    };

    fetchOrders(); // langsung fetch saat buka
    const interval = setInterval(fetchOrders, 3000); // refresh tiap 3 detik
    return () => clearInterval(interval);
  }, []);

  const openAdd  = () => {
    setForm({ name:"", price:"", cat:"reguler", img:"🍚", desc:"", fav:false, photo_url:"" });
    setPreviewUrl("");
    setModal("add");
  };
  const openEdit = item => {
    setForm({ ...item, price: String(item.price), photo_url: item.photo_url || "" });
    setPreviewUrl(item.photo_url || "");
    setModal({ mode:"edit", item });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreviewUrl(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("foto", file);
      const res  = await fetch(`${API_URL}/api/upload`, { method:"POST", body:fd });
      const data = await res.json();
      if (data.url) {
        setForm(prev => ({ ...prev, photo_url: data.url }));
        d({ type:"NOTIF", msg:"📸 Foto berhasil diupload!" });
      }
    } catch {
      d({ type:"NOTIF", msg:"⚠️ Gagal upload foto, cek koneksi server" });
    } finally {
      setUploading(false);
    }
  };

  const save = async () => {
    if (!form.name || !form.price) { d({ type:"NOTIF", msg:"⚠️ Nama & harga wajib diisi!" }); return; }
    const item = { ...form, price: parseInt(form.price) || 0 };
    try {
      if (modal === "add") {
        const res = await addMenu(item);
        d({ type:"ADD_MENU", item: { ...item, id: res.data?.id || Date.now() } });
      } else {
        const fullItem = { ...item, id: modal.item.id };
        await editMenu(fullItem);
        d({ type:"EDIT_MENU", item: fullItem });
      }
      d({ type:"NOTIF", msg:"✅ Menu tersimpan ke database!" });
    } catch (e) {
      if (modal === "add") d({ type:"ADD_MENU", item });
      else d({ type:"EDIT_MENU", item: { ...item, id: modal.item.id } });
      d({ type:"NOTIF", msg:"✅ Menu tersimpan!" });
    }
    setModal(null);
    setPreviewUrl("");
  };

  const TABS = [
    { id:"orders", ico:"📋", lbl:"Pesanan" },
    { id:"menu",   ico:"🍽️", lbl:"Menu" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"var(--OW)", paddingBottom:24 }}>
      <div className="ck-s"/>

      <div className="adm-hdr">
        <div>
          <div className="adm-ttl">ADMIN · SEMENJANA</div>
          <div className="adm-sub">Dashboard Kasir</div>
        </div>
        <button className="hbtn" onClick={() => d({ type:"SET_ROLE", v:null })}>🚪 Keluar</button>
      </div>

      <div className="adm-tabs">
        {TABS.map(t => (
          <button key={t.id} className={`atab ${tab===t.id?"on":""}`} onClick={() => setTab(t.id)}>
            <span className="atab-i">{t.ico}</span>{t.lbl}
          </button>
        ))}
      </div>
      <div className="ck-s"/>

      <div style={{ padding:16 }}>

        {/* ORDERS */}
        {tab === "orders" && (
          <>
            <div className="stat3">
              {[
                { id:"all",     l:"Total",   v:s.orders.length,                                 c:"var(--B)"  },
                { id:"pending", l:"Pending", v:s.orders.filter(o=>o.status==="pending").length, c:"var(--R)"  },
                { id:"ready",   l:"Siap",    v:s.orders.filter(o=>o.status==="ready").length,   c:"var(--OR)" },
                { id:"done",    l:"Selesai", v:s.orders.filter(o=>o.status==="done").length,    c:"var(--GR)" },
              ].map((card) => (
                <div 
                  key={card.id} 
                  className="scard"
                  onClick={() => setFilterStatus(card.id)}
                  style={{
                    cursor: "pointer",
                    border: filterStatus === card.id ? "2px solid var(--B)" : "1px solid transparent",
                    background: filterStatus === card.id ? "rgba(0,0,0,0.05)" : "transparent",
                    transition: "all 0.2s ease",
                    borderRadius: "8px",
                    padding: "12px",
                  }}
                >
                  <div className="scard-n" style={{ color:card.c }}>{card.v}</div>
                  <div className="scard-l">{card.l}</div>
                </div>
              ))}
            </div>

            {s.loading && (
              <div style={{ textAlign:"center", color:"var(--G)", padding:20 }}>
                ⏳ Memuat pesanan...
              </div>
            )}

            {!s.orders.length && !s.loading ? (
              <div className="empty">
                <span className="empty-e">📭</span>
                <p>Belum ada pesanan masuk</p>
              </div>
            ) : s.orders
                .filter(ord => filterStatus === "all" || ord.status === filterStatus)
                .map(ord => (
              <div key={ord.id} className="ao-card">
                <div className="ao-hd">
                  <div>
                    <div className="ao-id">{ord.id}</div>
                    <div className="ao-tm">{ord.date} · {ord.time}</div>
                  </div>
                  <select
                    className="ssel"
                    value={ord.status}
                    onChange={async e => {
                      const newStatus = e.target.value;
                      try { await updateOrderStatus(ord.id, newStatus); } catch(e) { console.warn(e); }
                      d({ type:"UPD_STATUS", id:ord.id, status:newStatus });
                    }}
                  >
                    <option value="pending">⏳ Pending</option>
                    <option value="ready">🔔 Siap</option>
                    <option value="done">✅ Selesai</option>
                  </select>
                </div>
                <div className="ao-tbl">🪑 Meja {ord.table} · 👤 {ord.customer}</div>
                <div className="ao-items">
                  {ord.items?.map(i => `${i.img} ${i.name} ×${i.qty}`).join("  ·  ")}
                </div>
                <div className="ao-ft">
                  <div className="ao-tot">Rp {ord.total?.toLocaleString("id-ID")}</div>
                  <div style={{ fontSize:11, color:"var(--G)" }}>
                    via {ord.method==="kasir"?"💵 Kasir":ord.method==="qris"?"📱 QRIS":"🏦 Transfer"}
                  </div>
                </div>
                <button
                  style={{ marginTop:8, width:"100%", background:"var(--B)", color:"#fff", border:"none", borderRadius:8, padding:"8px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Nunito',sans-serif" }}
                  onClick={() => {
                    const txt = [
                      "==============================",
                      "         SEMENJANA",
                      "    KETAN SUSU & KOPI",
                      "==============================",
                      `ID    : ${ord.id}`,
                      `Tgl   : ${ord.date}  ${ord.time}`,
                      `Meja  : ${ord.table}`,
                      `Nama  : ${ord.customer}`,
                      "------------------------------",
                      "PESANAN:",
                      ...ord.items?.map(i => `${i.name} x${i.qty}  Rp ${(i.price * i.qty).toLocaleString("id-ID")}`) || [],
                      "------------------------------",
                      `TOTAL : Rp ${ord.total?.toLocaleString("id-ID")}`,
                      "==============================",
                      "  Terima kasih sudah makan",
                      "     di Semenjana!",
                      "  @semenjana_ketan.kopi",
                      "==============================",
                    ].join("\n");
                    const a = document.createElement("a");
                    a.href = URL.createObjectURL(new Blob([txt], { type:"text/plain" }));
                    a.download = `struk-${ord.id}.txt`;
                    a.click();
                  }}
                >
                  📥 Download Struk
                </button>
              </div>
            ))}
          </>
        )}

        {/* MENU */}
        {tab === "menu" && (
          <>
            <button className="btn-b" style={{ marginBottom:12 }} onClick={openAdd}>
              + Tambah Menu Baru
            </button>
            {s.menuItems.map(item => (
              <div key={item.id} className="am-card">
                <div className="am-img">
                  {item.photo_url ? <img src={item.photo_url} alt={item.name}/> : item.img}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div className="am-n">{item.name} {item.fav?"⭐":""}</div>
                  <div className="am-m">{CATS.find(c=>c.id===item.cat)?.label}</div>
                  <div className="am-p">Rp {item.price.toLocaleString("id-ID")}</div>
                </div>
                <div className="am-acts">
                  <div className="ib" onClick={() => openEdit(item)}>✏️</div>
                  <div className="ib d" onClick={async () => {
                    try { await deleteMenu(item.id); } catch(e) { console.warn(e); }
                    d({ type:"DEL_MENU", id:item.id });
                    d({ type:"NOTIF", msg:"🗑️ Menu dihapus!" });
                  }}>🗑️</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* MODAL */}
      {modal && (
        <div className="mbg" onClick={e => e.target===e.currentTarget && setModal(null)}>
          <div className="modal">
            <h3>{modal==="add"?"Tambah Menu Baru":"Edit Menu"}</h3>

            <input type="file" accept="image/*" ref={fileRef} style={{ display:"none" }} onChange={handleFileChange}/>
            <span className="mlbl">📸 Foto Menu</span>
            {previewUrl ? (
              <>
                <img src={previewUrl} alt="preview" className="img-preview"/>
                <button className="btn-sm-g" style={{ marginBottom:9, fontSize:12, padding:"7px" }} onClick={() => fileRef.current.click()}>
                  🔄 Ganti Foto
                </button>
              </>
            ) : (
              <div className="img-upload-box" onClick={() => fileRef.current.click()}>
                {uploading ? "⏳ Mengupload..." : "📷 Klik untuk pilih foto menu"}
                <div style={{ fontSize:11, color:"var(--G)", marginTop:4 }}>JPG / PNG · maks. 5MB</div>
              </div>
            )}

            <span className="mlbl">Nama Menu *</span>
            <input className="mi" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="cth: Ketan susu matcha"/>

            <span className="mlbl">Harga (Rp) *</span>
            <input className="mi" type="number" value={form.price} onChange={e => setForm({...form, price:e.target.value})} placeholder="cth: 12000"/>

            <span className="mlbl">Kategori</span>
            <select className="msel" value={form.cat} onChange={e => setForm({...form, cat:e.target.value})}>
              {CATS.filter(c=>c.id!=="all").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>

            <span className="mlbl">Emoji Ikon (fallback jika tidak ada foto)</span>
            <input className="mi" value={form.img} onChange={e => setForm({...form, img:e.target.value})} placeholder="cth: 🍚"/>

            <span className="mlbl">Deskripsi</span>
            <input className="mi" value={form.desc} onChange={e => setForm({...form, desc:e.target.value})} placeholder="Deskripsi singkat menu"/>

            <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, fontWeight:700, color:"var(--B)", marginBottom:12, cursor:"pointer" }}>
              <input type="checkbox" checked={form.fav} onChange={e => setForm({...form, fav:e.target.checked})}/>
              ⭐ Tandai sebagai Favorit / Best
            </label>

            <div className="mft">
              <button className="mbtn-g" onClick={() => setModal(null)}>Batal</button>
              <button className="mbtn-b" onClick={save} disabled={uploading}>
                {uploading ? "⏳ Upload..." : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}