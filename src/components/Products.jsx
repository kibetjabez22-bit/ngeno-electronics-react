import { useContext } from "react";
import "./Product.css";
import ProductCard from "./ProductCard";
import { StoreContext } from "../context/StoreContext";

function Products() {
  const {
    products,
    categories,
    searchQuery,
    categoryFilter,
    setSearchQuery,
    setCategoryFilter,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useContext(StoreContext);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.specs.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products">
      <div className="products-header">
        <div>
          <h3>Product catalogue</h3>
          <p>Search, filter, and add your favourite electronics to the cart.</p>
        </div>
        <div className="search-bar">
          <span role="img" aria-label="Search">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search products, brands or specs"
          />
        </div>
      </div>

      <div className="categories" style={{ marginBottom: "1.5rem" }}>
        <div className="category-grid">
          {categories.map((category) => (
            <button
              type="button"
              key={category.title}
              className={`category-card ${category.accent} ${categoryFilter === category.title ? "selected" : ""}`}
              onClick={() => setCategoryFilter(categoryFilter === category.title ? "" : category.title)}
            >
              <div className="category-icon">{category.icon}</div>
              <p>{category.title}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <div className="product-card" style={{ padding: "2rem", textAlign: "center" }}>
            <p>No products match your search or filter. Try another term.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
