import { createContext, useReducer, useCallback, useEffect } from "react";
import { INIT_MENU } from "../data/menuData";
import { getMenu, getOrders, getSales } from "../api";

export const Ctx = createContext();

const savedRole  = localStorage.getItem("sjn_role");
const savedTable = localStorage.getItem("sjn_table");
const savedName  = localStorage.getItem("sjn_name");

const initState = {
  role:         savedRole  || null,
  view:         savedRole === "admin" ? "admin_orders" : savedRole === "user" ? "menu" : "qr",
  tableNumber:  savedTable || "",
  customerName: savedName  || "",
  cart:         [],
  orders:       [],
  menuItems:    INIT_MENU,
  activeCat:    "all",
  notification: null,
  lastOrder:    null,
  loading:      false,
  salesData: [
    {date:"Sen",rev:0,orders:0},
    {date:"Sel",rev:0,orders:0},
    {date:"Rab",rev:0,orders:0},
    {date:"Kam",rev:0,orders:0},
    {date:"Jum",rev:0,orders:0},
    {date:"Sab",rev:0,orders:0},
    {date:"Min",rev:0,orders:0},
  ],
};

function reducer(s, a) {
  switch(a.type) {
    case "SET_ROLE":    return {...s, role:a.v, view: a.v==="admin"?"admin_orders": a.v==="user"?"menu":"qr"};
    case "SET_VIEW":    return {...s, view:a.v};
    case "SET_TABLE":   return {...s, tableNumber:a.v};
    case "SET_NAME":    return {...s, customerName:a.v};
    case "SET_CAT":     return {...s, activeCat:a.v};
    case "SET_LOADING": return {...s, loading:a.v};
    case "SET_MENU":    return {...s, menuItems:a.items};
    case "SET_ORDERS":  return {...s, orders:a.orders};
    case "SET_SALES":   return {...s, salesData:a.data};
    case "ADD_CART": {
      const ex = s.cart.find(i=>i.id===a.item.id);
      if(ex) return {...s, cart:s.cart.map(i=>i.id===a.item.id?{...i,qty:i.qty+1}:i)};
      return {...s, cart:[...s.cart,{...a.item,qty:1}]};
    }
    case "UPD_QTY":  return {...s, cart:s.cart.map(i=>i.id===a.id?{...i,qty:a.qty}:i).filter(i=>i.qty>0)};
    case "PLACE_ORDER": {
      const ord = {
        id:`SJN-${Date.now().toString().slice(-6)}`,
        table:s.tableNumber,
        customer:s.customerName||"Pelanggan",
        items:[...s.cart],
        total:a.total,
        method:a.method,
        status:"pending",
        time:new Date().toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"}),
        date:new Date().toLocaleDateString("id-ID"),
        timestamp:Date.now(),
      };
      return {...s, orders:[ord,...s.orders], cart:[], view:"receipt", lastOrder:ord};
    }
    case "UPD_STATUS": return {...s, orders:s.orders.map(o=>o.id===a.id?{...o,status:a.status}:o)};
    case "ADD_MENU":   return {...s, menuItems:[...s.menuItems,{...a.item,id:Date.now()}]};
    case "EDIT_MENU":  return {...s, menuItems:s.menuItems.map(m=>m.id===a.item.id?a.item:m)};
    case "DEL_MENU":   return {...s, menuItems:s.menuItems.filter(m=>m.id!==a.id)};
    case "NOTIF":       return {...s, notification:a.msg};
    case "CLEAR_NOTIF": return {...s, notification:null};
    default: return s;
  }
}

export function AppProvider({ children }) {
  const [s, rawDispatch] = useReducer(reducer, initState);
  const d = useCallback(a => rawDispatch(a), []);

  // Simpan login state ke localStorage
  useEffect(() => {
    if (s.role) {
      localStorage.setItem("sjn_role",  s.role);
      localStorage.setItem("sjn_table", s.tableNumber);
      localStorage.setItem("sjn_name",  s.customerName);
    } else {
      localStorage.removeItem("sjn_role");
      localStorage.removeItem("sjn_table");
      localStorage.removeItem("sjn_name");
    }
  }, [s.role, s.tableNumber, s.customerName]);

  // Load menu dari database
  useEffect(() => {
    async function loadMenu() {
      try {
        const items = await getMenu();
        if (items.length > 0) {
          const mapped = items.map(item => ({
            ...item,
            fav:  !!item.fav,
            desc: item.desc || item.description || "",
          }));
          d({ type:"SET_MENU", items: mapped });
        }
      } catch (e) {
        console.warn("Backend tidak terhubung, pakai data lokal:", e.message);
      }
    }
    loadMenu();
  }, []);

  // Load orders + sales saat login admin
  useEffect(() => {
    if (s.role !== "admin") return;
    async function loadAdminData() {
      try {
        d({ type:"SET_LOADING", v:true });
        const orders = await getOrders();
        d({ type:"SET_ORDERS", orders });
        const salesRaw = await getSales(7);
        if (salesRaw.length > 0) {
          const days = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
          const mapped = salesRaw.map(row => ({
            date:   days[new Date(row.date).getDay()],
            rev:    parseInt(row.rev)    || 0,
            orders: parseInt(row.orders) || 0,
          }));
          d({ type:"SET_SALES", data: mapped });
        }
      } catch (e) {
        console.warn("Gagal load data admin:", e.message);
      } finally {
        d({ type:"SET_LOADING", v:false });
      }
    }
    loadAdminData();
  }, [s.role]);

  return (
    <Ctx.Provider value={{ s, d }}>
      {children}
    </Ctx.Provider>
  );
}