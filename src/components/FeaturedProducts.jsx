import { useContext } from "react";
import "./FeaturedProducts.css";
import ProductCard from "./ProductCard";
import { StoreContext } from "../context/StoreContext";

const featuredSlugs = ["lap-1", "lap-2", "phone-1", "phone-2"];

function FeaturedProducts() {
  const { products, addToCart, wishlist, toggleWishlist } = useContext(StoreContext);
  const featuredProducts = products.filter((product) => featuredSlugs.includes(product.id));

  return (
    <section className="featured">
      <div className="featured-header">
        <span className="featured-badge">Featured Products</span>
        <h2>Premium electronics your customers will love</h2>
        <p>
          Carefully selected devices with verified quality, smart pricing, and
          trusted performance.
        </p>
      </div>

      <div className="product-grid">
        {featuredProducts.map((product) => (
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
            onWishlistToggle={() => toggleWishlist(product.id)}
            isFavorite={wishlist.includes(product.id)}
            variant="featured"
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;