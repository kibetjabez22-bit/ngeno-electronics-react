import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function SignIn() {
  const { signIn, loadingAuth } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Enter your email and password to sign in.");
      return;
    }
    const res = await signIn({ email, password });
    if (res.success) {
      navigate("/");
    } else {
      setMessage(res.message || "Sign in failed.");
    }
  };

  return (
    <div className="products" style={{ paddingBottom: "4rem" }}>
      <div className="product-card" style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
        <h3>Sign in to your account</h3>
        <p>Access your order history, wishlist, and checkout faster.</p>
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

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="btn btn-primary" disabled={loadingAuth}>
            {loadingAuth ? "Signing in..." : "Sign In"}
          </button>
        </form>
        {message && <p style={{ marginTop: "1rem", color: "#dc2626" }}>{message}</p>}
        <p style={{ marginTop: "1rem" }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <p style={{ marginTop: "1rem" }}>
          New customer? <Link to="/signup">Create an account</Link>.
        </p>
      </div>
    </div>
  );
}

export default SignIn;
