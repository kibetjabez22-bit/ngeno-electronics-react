import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

function AdminRoute({ children }) {
  const { user } = useContext(StoreContext);

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  if (!user.isAdmin) {
    return (
      <div className="products" style={{ padding: "4rem 2rem" }}>
        <div className="product-card" style={{ padding: "2rem" }}>
          <h3>Unauthorized</h3>
          <p>You do not have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
