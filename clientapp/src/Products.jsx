import React, { useEffect, useState } from "react";
import { getProducts } from "./api";
import { Link } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    getProducts().then(d => setData(d)).catch(e => setErr(e.message));
  }, []);

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (!data) return <div>Loading products...</div>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {Array.isArray(data)
          ? data.map(p => (
              <li key={p.id || p.productId || JSON.stringify(p)}>
                <Link to={`/products/${p.id || p.productId}`}>{p.name || p.productName || JSON.stringify(p)}</Link>
              </li>
            ))
          : <li>{JSON.stringify(data)}</li>}
      </ul>
    </div>
  );
}
