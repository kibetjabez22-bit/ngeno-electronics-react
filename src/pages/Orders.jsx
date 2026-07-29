import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function Orders() {
  const { orders } = useContext(StoreContext);

  return (
    <div className="products">
      <div className="products-header">
        <div>
          <h3>Order Tracking</h3>
          <p>Review your most recent orders and track delivery progress.</p>
        </div>
        <Link to="/products" className="view-all">
          Browse products
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="product-card" style={{ textAlign: "center", padding: "2rem" }}>
          <p>You have no orders yet. Place a purchase to start tracking.</p>
        </div>
      ) : (
        <div className="product-grid" style={{ gridTemplateColumns: "1fr" }}>
          {orders.map((order) => (
            <div key={order.id} className="product-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <h4>Order {order.id}</h4>
                  <p style={{ color: "#6b7280" }}>{new Date(order.placedAt).toLocaleString()}</p>
                </div>
                <span style={{ fontWeight: 700, color: "#2563eb" }}>{order.status}</span>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <p><strong>Payment:</strong> {order.paymentMethod}</p>
                <p><strong>Phone:</strong> {order.paymentPhone}</p>
                <p><strong>Total:</strong> KES {order.total.toLocaleString()}</p>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <h5>Items</h5>
                <ul style={{ paddingLeft: "1.2rem" }}>
                  {order.items.map((item) => (
                    <li key={item.id} style={{ marginBottom: "0.35rem" }}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
