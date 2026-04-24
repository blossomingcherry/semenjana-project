import { useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function UserNav() {
  const { s, d } = useContext(Ctx);
  const bge = s.cart.reduce((a, i) => a + i.qty, 0);

  const NAV = [
    { id:"menu", ico:"🍽️", lbl:"Menu" },
    { id:"cart", ico:"🛒", lbl:"Keranjang", b: bge },
  ];

  return (
    <nav className="bnav">
      {NAV.map(n => (
        <button
          key={n.id}
          className={`nb ${s.view === n.id ? "on" : ""}`}
          onClick={() => d({ type:"SET_VIEW", v:n.id })}
        >
          <span className="ni">{n.ico}</span>
          {n.b > 0 && (
            <span className="bge" style={{ position:"absolute", top:2, right:8, fontSize:9 }}>
              {n.b}
            </span>
          )}
          <span className="nl">{n.lbl}</span>
        </button>
      ))}
    </nav>
  );
}