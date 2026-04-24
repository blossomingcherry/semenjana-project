import { useContext } from "react";
import { AppProvider, Ctx } from "./context/AppContext";
import CSS from "./styles/styles";

// Components
import Notif    from "./components/Notif";
import UserNav  from "./components/UserNav";

// Pages
import QRPage       from "./pages/QRPage";
import MenuPage     from "./pages/MenuPage";
import CartPage     from "./pages/CartPage";
import PaymentPage  from "./pages/PaymentPage";
import ReceiptPage  from "./pages/ReceiptPage";
import OrdersPage   from "./pages/OrdersPage";
import AdminPanel   from "./pages/AdminPanel";

function AppInner() {
  const { s, d } = useContext(Ctx);

  return (
    <div className="app">
      {/* Halaman Login / QR */}
      {!s.role && <QRPage/>}

      {/* Panel Admin */}
      {s.role === "admin" && <AdminPanel/>}

      {/* Tampilan User */}
      {s.role === "user" && (
        <>
          {/* Header */}
          <div className="hdr">
            <div className="ck-s"/>
            <div className="hdr-in">
              <div>
                <div className="hdr-brand"><em>S</em>EMENJANA</div>
                <div className="hdr-sub">Ketan Susu &amp; Kopi · Meja {s.tableNumber}</div>
              </div>
              <div className="hdr-r">
                {s.cart.length > 0 && (
                  <button className="hbtn" onClick={() => d({ type: "SET_VIEW", v: "cart" })}>
                    🛒 <span className="bge">{s.cart.reduce((a, i) => a + i.qty, 0)}</span>
                  </button>
                )}
                <button className="hbtn" onClick={() => d({ type: "SET_ROLE", v: null })}>🚪</button>
              </div>
            </div>
            <div className="ck-s"/>
          </div>

          {/* Halaman User */}
          {s.view === "menu"    && <MenuPage/>}
          {s.view === "cart"    && <CartPage/>}
          {s.view === "payment" && <PaymentPage/>}
          {s.view === "receipt" && <ReceiptPage/>}
          {s.view === "orders"  && <OrdersPage/>}

          {/* Bottom Nav */}
          {["menu", "cart", "orders"].includes(s.view) && <UserNav/>}
        </>
      )}

      <Notif/>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <style>{CSS}</style>
      <AppInner/>
    </AppProvider>
  );
}
