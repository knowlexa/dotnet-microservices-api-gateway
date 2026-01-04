// src/api.js
const GATEWAY_BASE = import.meta.env.VITE_GATEWAY_URL || "http://localhost:5000";

export async function login(username, password) {
  const res = await fetch(`${GATEWAY_BASE}/auth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const body = await res.json();
  // body.token or body.access_token depending on your AuthService
  // handle both variants:
  return body.token || body.access_token || body.accessToken;
}

export function setToken(token) {
  localStorage.setItem("jwt", token);
}

export function getToken() {
  return localStorage.getItem("jwt");
}

export async function getProducts() {
  const token = getToken();
  const res = await fetch(`${GATEWAY_BASE}/products`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" }
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Products failed ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function getOrders() {
  const token = getToken();
  const res = await fetch(`${GATEWAY_BASE}/orders`, {
    headers: { Authorization: token ? `Bearer ${token}` : "" }
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Orders failed ${res.status}: ${txt}`);
  }
  return res.json();
}

export function logout() {
  localStorage.removeItem("jwt");
}
