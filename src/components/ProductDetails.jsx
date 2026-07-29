import { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist } = useContext(StoreContext);
  const navigate = useNavigate();

  const product = products.find((item) => item.id === id);
  if (!product) {
    return (
      <div className="product-page">
        <div className="product-info">
          <h1>Product not found</h1>
          <Link to="/products" className="btn btn-secondary">
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const isFavorite = wishlist.includes(product.id);

  return (
    <div className="product-page">
      <div className="product-gallery">
        <div className="main-image">
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="thumbnails">
          {[product.image, product.image, product.image, product.image].map((src, index) => (
            <div key={index}>
              <img src={src} alt={`${product.name} ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      <div className="product-info">
        <span className="verified">{product.badge || "NGENOS VERIFIED"}</span>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <h1>{product.name}</h1>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => toggleWishlist(product.id)}
          >
            {isFavorite ? "Remove wishlist" : "Save wishlist"}
          </button>
        </div>
        <div className="rating">
          <span>⭐ {product.rating}</span>
          <span>({product.reviews} reviews)</span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", margin: "1rem 0" }}>
          <h2>{product.displayPrice}</h2>
          {product.oldPrice ? <del>{product.oldPrice}</del> : null}
          {product.discount ? <span className="badge">{product.discount}</span> : null}
        </div>

        <ul>
          {product.specs.split(" • ").map((spec) => (
            <li key={spec}>{spec}</li>
          ))}
        </ul>

        <div className="buttons">
          <button className="cart" type="button" onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          <button className="buy" type="button" onClick={() => navigate("/checkout")}>Buy Now</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
