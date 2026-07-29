import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

function Admin() {
  const { products, cart, wishlist, orders } = useContext(StoreContext);
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const productsSold = orders.reduce((sum, order) => sum + order.items.reduce((sub, item) => sub + item.quantity, 0), 0);
  const activeOrders = orders.filter((order) => order.status !== "Delivered").length;

  return (
    <div className="products">
      <div className="products-header">
        <div>
          <h3>Admin Dashboard</h3>
          <p>Quick insights for store activity, product interest, and order flow.</p>
        </div>
      </div>

      <div className="product-grid" style={{ gridTemplateColumns: "repeat(3, minmax(220px, 1fr))", gap: "1.5rem" }}>
        <div className="product-card" style={{ padding: "1.5rem" }}>
          <h4>Total revenue</h4>
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }}>KES {revenue.toLocaleString()}</p>
        </div>

        <div className="product-card" style={{ padding: "1.5rem" }}>
          <h4>Products sold</h4>
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }}>{productsSold}</p>
        </div>

        <div className="product-card" style={{ padding: "1.5rem" }}>
          <h4>Open orders</h4>
          <p style={{ fontSize: "1.75rem", fontWeight: 700 }}>{activeOrders}</p>
        </div>
      </div>

      <div className="product-card" style={{ marginTop: "2rem", padding: "1.5rem" }}>
        <h4>Product catalog</h4>
        <p>Total products available: {products.length}</p>
        <p>Customers have added {cart.length} items to carts across the store.</p>
        <p>Wishlist favorites: {wishlist.length}</p>
      </div>
    </div>
  );
}

export default Admin;
