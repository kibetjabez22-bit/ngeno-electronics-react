import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function SignUp() {
  const { signUp, loadingAuth } = useContext(StoreContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setMessage("Enter a valid email and password to sign up.");
      return;
    }
    const res = await signUp({ email, password, name });
    if (res.success) {
      navigate("/");
    } else {
      setMessage(res.message || "Sign up failed.");
    }
  };

  return (
    <div className="products" style={{ paddingBottom: "4rem" }}>
      <div className="product-card" style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem" }}>
        <h3>Create your account</h3>
        <p>Sign up to save favorites, track orders, and checkout faster.</p>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Jane Doe"
            />
          </label>
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
            {loadingAuth ? "Creating account..." : "Create account"}
          </button>
        </form>
        {message && <p style={{ marginTop: "1rem", color: "#dc2626" }}>{message}</p>}
        <p style={{ marginTop: "1rem" }}>
          Already have an account? <Link to="/signin">Sign in</Link>.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
