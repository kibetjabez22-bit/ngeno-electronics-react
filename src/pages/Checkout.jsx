import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function Checkout() {
  const {
    cart,
    cartCount,
    placeOrder,
    user,
  } = useContext(StoreContext);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = cart.length ? 800 : 0;
  const total = subtotal + shipping;

  function handleSubmit(event) {
    event.preventDefault();
    if (!cart.length) {
      setSuccess({ type: "error", message: "Please add products to your cart first." });
      return;
    }
    if (!phone || !email) {
      setSuccess({ type: "error", message: "Please provide your email and M-Pesa phone number." });
      return;
    }

    const order = placeOrder({ paymentMethod, phone, email });
    setSuccess({ type: "success", message: `Order ${order.id} confirmed. Receipt will be emailed to ${email}.` });
    navigate("/orders");
  }

  return (
    <div className="products" style={{ paddingBottom: "4rem" }}>
      <div className="products-header">
        <div>
          <h3>Checkout</h3>
          <p>Complete your order securely with M-Pesa and receive an email receipt.</p>
        </div>
        <Link to="/cart" className="view-all">Back to cart</Link>
      </div>

      <div className="product-grid" style={{ gridTemplateColumns: "1.2fr 0.8fr" }}>
        <form onSubmit={handleSubmit} className="product-card" style={{ padding: "2rem" }}>
          <h4>Payment details</h4>
          <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              M-Pesa phone number
              <input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="2547XXXXXXXX"
                required
              />
            </label>
            <label>
              Payment method
              <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
                <option value="M-Pesa">M-Pesa</option>
                <option value="Card">Card / Visa</option>
              </select>
            </label>
            <button type="submit" className="btn btn-primary">
              Pay KES {total.toLocaleString()}
            </button>
            {success && (
              <div style={{ padding: "1rem", background: success.type === "success" ? "#d1fae5" : "#fee2e2", borderRadius: "12px" }}>
                {success.message}
              </div>
            )}
          </div>
        </form>

        <div className="product-card" style={{ padding: "2rem" }}>
          <h4>Order summary</h4>
          <div style={{ marginTop: "1rem", display: "grid", gap: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Items</span>
              <span>{cartCount}</span>
            </div>
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
          </div>
          {cart.length === 0 && (
            <p style={{ marginTop: "1rem", color: "#6b7280" }}>
              Your cart is empty, add products before checking out.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
