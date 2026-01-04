import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts } from "./api";

export default function ProductDetail() {
  const { id: productIdParam } = useParams();
  const [product, setProduct] = useState(undefined);
  const [err, setErr] = useState("");

  useEffect(() => {
    getProducts()
      .then(data => {
        const arr = Array.isArray(data) ? data : [data];
        setProduct(arr.find(p => String(p.id || p.productId) === productIdParam));
      })
      .catch(e => setErr(e.message));
  }, [productIdParam]);

  if (err) return <div style={{ color: "red" }}>{err}</div>;
  if (product === undefined) return <div>Loading product...</div>;
  if (!product) return (
    <div className="product-detail-card">
      <h2 className="product-detail-title">Product Not Found</h2>
      <div style={{ marginBottom: 16 }}>Sorry, the product you are looking for does not exist.</div>
      <Link className="product-detail-back" to="/products">&larr; Back to Products</Link>
    </div>
  );


  // Pick common product fields for display only after product is defined
  let id, productId, name, productName, price, description, rest;
  if (product) {
    ({ id, productId, name, productName, price, description, ...rest } = product);
  }

  return (
    <div className="product-detail-card">
      <h2 className="product-detail-title">Product Detail</h2>
      <div className="product-detail-label"><b>Name:</b> {name || productName}</div>
      {(id || productId) && <div className="product-detail-id"><b>ID:</b> {id || productId}</div>}
      {price !== undefined && <div className="product-detail-price"><b>Price:</b> ${price}</div>}
      {description && <div className="product-detail-description"><b>Description:</b> {description}</div>}
      {/* Display any other fields in a table if present */}
      {Object.keys(rest).length > 0 && (
        <table className="product-detail-table">
          <tbody>
            {Object.entries(rest).map(([k, v]) => (
              <tr key={k}>
                <td style={{ fontWeight: "bold", width: 120 }}>{k}</td>
                <td>{String(v)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link className="product-detail-back" to="/products">&larr; Back to Products</Link>
    </div>
  );
}
