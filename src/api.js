// Base URL backend
const BASE = "http://localhost:3001";

// ── MENU ─────────────────────────────────────────────────
export async function getMenu() {
  const res = await fetch(`${BASE}/api/menu`);
  const data = await res.json();
  return data.data || [];
}

export async function addMenu(item) {
  const res = await fetch(`${BASE}/api/menu`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return await res.json();
}

export async function editMenu(item) {
  const res = await fetch(`${BASE}/api/menu/${item.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return await res.json();
}

export async function deleteMenu(id) {
  const res = await fetch(`${BASE}/api/menu/${id}`, { method: "DELETE" });
  return await res.json();
}

// ── ORDERS ───────────────────────────────────────────────
export async function getOrders() {
  const res = await fetch(`${BASE}/api/orders`);
  const data = await res.json();
  return data.data || [];
}

export async function getOrdersByTable(tableNo) {
  const res = await fetch(`${BASE}/api/orders/table/${tableNo}`);
  const data = await res.json();
  return data.data || [];
}

export async function placeOrder(order) {
  const res = await fetch(`${BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return await res.json();
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${BASE}/api/orders/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return await res.json();
}

// ── SALES ────────────────────────────────────────────────
export async function getSales(days = 7) {
  const res = await fetch(`${BASE}/api/sales?days=${days}`);
  const data = await res.json();
  return data.data || [];
}