import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function Cart() {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useContext(StoreContext);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length ? 800 : 0;
  const total = subtotal + shipping;

  return (
    <div className="products" style={{ paddingBottom: "4rem" }}>
      <div className="products-header">
        <div>
          <h3>Shopping cart</h3>
          <p>Review quantities, compare totals, and continue to checkout.</p>
        </div>
        <Link to="/checkout" className="view-all">
          Checkout now
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="product-card" style={{ padding: "2rem", textAlign: "center" }}>
          <p>Your cart is empty. Add an item to proceed to purchase.</p>
        </div>
      ) : (
        <div className="product-grid" style={{ gridTemplateColumns: "1fr 0.45fr", gap: "1.5rem" }}>
          <div>
            {cart.map((item) => (
              <div key={item.id} className="product-card" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <img src={item.image} alt={item.name} style={{ width: "96px", height: "96px", objectFit: "cover", borderRadius: "12px" }} />
                  <div style={{ flex: 1 }}>
                    <h4>{item.name}</h4>
                    <p style={{ color: "#6b7280", margin: "0.4rem 0" }}>{item.specs}</p>
                    <p style={{ margin: 0 }}><strong>{item.displayPrice}</strong> <del>{item.oldPrice}</del></p>
                  </div>
                </div>
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <label>
                    Qty
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(event) => updateCartQuantity(item.id, Number(event.target.value))}
                      style={{ width: "70px", marginLeft: "0.5rem", padding: "0.35rem 0.5rem" }}
                    />
                  </label>
                  <button type="button" className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="product-card" style={{ padding: "1.5rem" }}>
            <h4>Cart summary</h4>
            <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Subtotal</span>
                <span>KES {subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping</span>
                <span>KES {shipping.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: "1rem" }}>
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary" style={{ textAlign: "center" }}>
                Proceed to Checkout
              </Link>
              <button type="button" className="btn btn-secondary" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
