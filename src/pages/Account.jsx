import { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";

function Account() {
  const { user, signOut, orders, cartCount, wishlistCount, resendVerificationEmail } = useContext(StoreContext);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  if (!user) {
    return (
      <div className="products" style={{ padding: "4rem 2rem" }}>
        <div className="product-card" style={{ padding: "2rem" }}>
          <h3>Please sign in</h3>
          <p>
            You need to sign in to view your account dashboard. Use the navigation bar to access Sign In or Sign Up.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="products" style={{ padding: "4rem 2rem" }}>
      <div className="products-header">
        <div>
          <h3>My Account</h3>
          <p>Manage your profile, track orders, and keep your wishlist ready.</p>
        </div>
      </div>

      <div className="product-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
        <div className="product-card" style={{ padding: "2rem" }}>
          <h4>Profile</h4>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              signOut();
              setMessage("You have signed out.");
            }}
          >
            Sign Out
          </button>
          {message && <p style={{ marginTop: "1rem", color: status === "success" ? "#2563eb" : "#dc2626" }}>{message}</p>}

          {!user.emailVerified && (
            <div style={{ marginTop: "1.5rem" }}>
              <p style={{ color: "#b45309" }}>
                Your email is not verified. Verify your account to unlock account features.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={async () => {
                  const res = await resendVerificationEmail();
                  setStatus(res.success ? "success" : "error");
                  setMessage(res.success ? "Verification email sent. Check your inbox." : res.message);
                }}
              >
                Resend verification email
              </button>
            </div>
          )}
        </div>

        <div className="product-card" style={{ padding: "2rem" }}>
          <h4>Activity</h4>
          <p>Cart items: {cartCount}</p>
          <p>Wishlist items: {wishlistCount}</p>
          <p>Orders placed: {orders.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
