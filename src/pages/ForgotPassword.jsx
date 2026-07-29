import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function ForgotPassword() {
  const { resetPassword } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setMessage("Enter your email address to reset your password.");
      setStatus("");
      return;
    }

    const res = await resetPassword(email);
    if (res.success) {
      setStatus("success");
      setMessage("Password reset email sent. Please check your inbox.");
    } else {
      setStatus("error");
      setMessage(res.message || "Unable to send reset email.");
    }
  };

  return (
    <div className="products" style={{ paddingBottom: "4rem" }}>
      <div className="product-card" style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
        <h3>Reset your password</h3>
        <p>Enter the email associated with your account and we’ll send a reset link.</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary">
            Send reset link
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "1rem", color: status === "success" ? "#2563eb" : "#dc2626" }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "1rem" }}>
          Remembered your password? <Link to="/signin">Sign in</Link>.
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
