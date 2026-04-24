import { useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function CartPage() {
  const { s, d } = useContext(Ctx);
  const total = s.cart.reduce((a, i) => a + i.price * i.qty, 0);

  if (!s.cart.length) return (
    <div className="pg">
      <div className="empty">
        <span className="empty-e">🛒</span>
        <p>Keranjang kosong. Yuk pilih menu!</p>
        <br/>
        <button
          className="btn-b"
          style={{ width:"auto", padding:"10px 24px" }}
          onClick={() => d({ type:"SET_VIEW", v:"menu" })}
        >
          ← Kembali ke Menu
        </button>
      </div>
    </div>
  );

  return (
    <div className="pg">
      <div className="pg-title">🛒 Keranjang</div>

      {s.cart.map(item => (
        <div className="ci" key={item.id}>
          <div className="ci-img">
            {item.photo_url
              ? <img src={item.photo_url} alt={item.name}/>
              : item.img}
          </div>
          <div style={{ flex:1 }}>
            <div className="ci-n">{item.name}</div>
            <div className="ci-p">Rp {item.price.toLocaleString("id-ID")} × {item.qty}</div>
          </div>
          <div className="qc">
            <div className="qb-d" onClick={() => d({ type:"UPD_QTY", id:item.id, qty:item.qty - 1 })}>−</div>
            <span className="qn">{item.qty}</span>
            <div className="qb" onClick={() => d({ type:"ADD_CART", item })}>+</div>
          </div>
        </div>
      ))}

      <div className="tot-box">
        <div className="tot-m">
          <span>Total</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      <button className="btn-b" onClick={() => d({ type:"SET_VIEW", v:"payment" })}>
        Lanjut Konfirmasi →
      </button>
    </div>
  );
}