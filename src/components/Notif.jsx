import { useEffect, useContext } from "react";
import { Ctx } from "../context/AppContext";

export default function Notif() {
  const { s, d } = useContext(Ctx);

  useEffect(() => {
    if (!s.notification) return;
    const t = setTimeout(() => d({ type: "CLEAR_NOTIF" }), 2800);
    return () => clearTimeout(t);
  }, [s.notification]);

  if (!s.notification) return null;
  return <div className="notif">{s.notification}</div>;
}
