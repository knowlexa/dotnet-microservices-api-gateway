import React, { useState } from "react";
import Login from "./Login";
import Products from "./Products";
import Orders from "./Orders";
import ProductDetail from "./ProductDetail";
import { getToken, logout } from "./api";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  const authenticated = Boolean(getToken());
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", fontFamily: "system-ui, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Micro-demo UI</h1>
        <nav>
          <button onClick={() => navigate("/")}>Home</button>{" "}
          <button onClick={() => navigate("/products")}>Products</button>{" "}
          <button onClick={() => navigate("/orders")}>Orders</button>{" "}
          {!authenticated ? (
            <button onClick={() => navigate("/login")}>Login</button>
          ) : (
            <button onClick={() => { logout(); window.location.reload(); }}>Logout</button>
          )}
        </nav>
      </header>

      <main style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<div>Welcome — use the navigation to Login, view Products, or Orders.</div>} />
          <Route path="/login" element={<Login onLogin={() => navigate("/products")} />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </main>
    </div>
  );
}
