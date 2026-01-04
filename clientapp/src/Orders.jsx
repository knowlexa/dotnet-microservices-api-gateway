import React, { useEffect, useState } from "react";
import { getOrders } from "./api";

export default function Orders() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [openOrders, setOpenOrders] = useState([]); // Track expanded orders

  useEffect(() => {
    getOrders().then(d => setData(d)).catch(e => setErr(e.message));
  }, []);

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!data) return <div>Loading orders...</div>;


  // Ensure data is always an array
  const orders = Array.isArray(data) ? data : [data];

  const toggleOrder = (orderId) => {
    setOpenOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div>
      <h2>Orders</h2>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th></th>
            <th>Order ID</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            let products = [];
            try {
              products = JSON.parse(order.products);
            } catch (e) {
              products = [];
            }
            const isOpen = openOrders.includes(order.orderId);
            return (
              <React.Fragment key={order.orderId}>
                <tr style={{ background: isOpen ? "#d0eaff" : "#e8e8ff", cursor: "pointer" }}>
                  <td style={{ width: 40, textAlign: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: isOpen ? "#2196f3" : "#aaa",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 18,
                        lineHeight: "24px",
                        userSelect: "none"
                      }}
                      onClick={() => toggleOrder(order.orderId)}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </td>
                  <td>{order.orderId}</td>
                  <td>{isOpen ? `${products.length} product(s)` : "(click + to view)"}</td>
                </tr>
                {isOpen && (
                  <tr>
                    <td></td>
                    <td colSpan={2}>
                      <table style={{ width: "100%", background: "#fff", margin: "8px 0" }}>
                        <thead>
                          <tr style={{ background: "#f9f9f9" }}>
                            <th>ID</th>
                            <th>Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(prod => (
                            <tr key={prod.id}>
                              <td>{prod.id}</td>
                              <td>{prod.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
