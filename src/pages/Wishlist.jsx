import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { products, wishlist, toggleWishlist, addToCart } = useContext(StoreContext);
  const favoriteProducts = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="products">
      <div className="products-header">
        <div>
          <h3>Your Wishlist</h3>
          <p>Favorites saved for later browsing, pricing, and checkout.</p>
        </div>
        <Link to="/products" className="view-all">
          Continue shopping
        </Link>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="product-card" style={{ textAlign: "center", padding: "2rem" }}>
          <p>No favorites yet. Tap the heart icon on any product to save it here.</p>
        </div>
      ) : (
        <div className="product-grid">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.displayPrice}
              image={product.image}
              description={product.specs}
              badge={product.badge}
              discount={product.discount}
              oldPrice={product.oldPrice}
              buttonLabel="Add to Cart"
              onButtonClick={() => addToCart(product)}
              variant="featured"
              onWishlistToggle={() => toggleWishlist(product.id)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
