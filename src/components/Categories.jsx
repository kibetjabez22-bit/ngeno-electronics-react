import { useState } from "react";
import "./Categories.css";
import ProductCard from "./ProductCard";
import hpImage from "../assets/HP.png";
import dellImage from "../assets/dell.png";
import galaxyImage from "../assets/GALAXY A35.png";
import iphoneImage from "../assets/iphone 128GB.png";

const categories = [
  { icon: "💻", title: "Laptops", accent: "blue" },
  { icon: "📱", title: "Smartphones", accent: "pink" },
  { icon: "🖥️", title: "Desktop Computers", accent: "green" },
  { icon: "📟", title: "Tablets", accent: "purple" },
  { icon: "🖥️", title: "Monitors", accent: "orange" },
  { icon: "📺", title: "TVs", accent: "teal" },
  { icon: "🖨️", title: "Printers", accent: "cyan" },
  { icon: "🌐", title: "Networking", accent: "indigo" },
  { icon: "🎧", title: "Accessories", accent: "red" },
  { icon: "🎵", title: "Audio & Video", accent: "yellow" },
  { icon: "📷", title: "Cameras", accent: "violet" },
  { icon: "🎮", title: "Gaming", accent: "rose" },
];

const categoryProducts = {
  Laptops: [
    {
      id: "lap-1",
      name: "HP EliteBook 840 G6",
      specs: "Core i5 • 16GB RAM • 512GB SSD",
      price: "KES 38,000",
      oldPrice: "KES 45,000",
      discount: "-15%",
      badge: "NGENOS VERIFIED",
      image: hpImage,
    },
    {
      id: "lap-2",
      name: "Dell Latitude 7490",
      specs: "Core i7 • 8GB RAM • 256GB SSD",
      price: "KES 42,000",
      oldPrice: "KES 50,000",
      discount: "-16%",
      badge: "REFURBISHED",
      image: dellImage,
    },
  ],
  Smartphones: [
    {
      id: "phone-1",
      name: "iPhone 13",
      specs: "128GB • Midnight",
      price: "KES 72,000",
      oldPrice: "KES 80,000",
      discount: "-10%",
      badge: "NEW",
      image: iphoneImage,
    },
    {
      id: "phone-2",
      name: "Samsung Galaxy A35",
      specs: "256GB • 8GB RAM",
      price: "KES 39,500",
      oldPrice: "KES 45,000",
      discount: "-12%",
      badge: "NEW",
      image: galaxyImage,
    },
  ],
  "Desktop Computers": [
    {
      id: "desktop-1",
      name: "HP EliteDesk 800",
      specs: "Core i7 • 16GB RAM • 1TB SSD",
      price: "KES 62,000",
      oldPrice: "KES 72,000",
      discount: "-14%",
      badge: "BEST VALUE",
      image: hpImage,
    },
  ],
  Tablets: [
    {
      id: "tablet-1",
      name: "Galaxy Tab S7",
      specs: "128GB • Wi-Fi",
      price: "KES 55,000",
      oldPrice: "KES 63,000",
      discount: "-13%",
      badge: "LIMITED",
      image: "https://via.placeholder.com/320x220?text=Tablet",
    },
  ],
  Monitors: [
    {
      id: "monitor-1",
      name: "Curved Gaming Monitor",
      specs: "27\" • 144Hz • FHD",
      price: "KES 29,500",
      oldPrice: "KES 35,000",
      discount: "-15%",
      badge: "POPULAR",
      image: "https://via.placeholder.com/320x220?text=Monitor",
    },
  ],
  TVs: [
    {
      id: "tv-1",
      name: "Smart 4K TV",
      specs: "55\" • HDR • Streaming",
      price: "KES 89,000",
      oldPrice: "KES 104,000",
      discount: "-14%",
      badge: "HOT",
      image: "https://via.placeholder.com/320x220?text=TV",
    },
  ],
  Printers: [
    {
      id: "printer-1",
      name: "All-in-One Printer",
      specs: "Print • Scan • Copy",
      price: "KES 14,800",
      oldPrice: "KES 17,500",
      discount: "-15%",
      badge: "OFFICE",
      image: "https://via.placeholder.com/320x220?text=Printer",
    },
  ],
  Networking: [
    {
      id: "network-1",
      name: "Wi-Fi 6 Router",
      specs: "Dual Band • 2400Mbps",
      price: "KES 10,900",
      oldPrice: "KES 12,900",
      discount: "-15%",
      badge: "FAST",
      image: "https://via.placeholder.com/320x220?text=Router",
    },
  ],
  Accessories: [
    {
      id: "accessory-1",
      name: "Wireless Headphones",
      specs: "Noise Cancelling • Bluetooth",
      price: "KES 8,950",
      oldPrice: "KES 11,000",
      discount: "-19%",
      badge: "TRENDY",
      image: "https://via.placeholder.com/320x220?text=Headphones",
    },
  ],
  "Audio & Video": [
    {
      id: "audio-1",
      name: "Bluetooth Speaker",
      specs: "Portable • 12hr Battery",
      price: "KES 5,450",
      oldPrice: "KES 6,500",
      discount: "-16%",
      badge: "CLEARANCE",
      image: "https://via.placeholder.com/320x220?text=Speaker",
    },
  ],
  Cameras: [
    {
      id: "camera-1",
      name: "Mirrorless Camera",
      specs: "24MP • 4K Video",
      price: "KES 68,000",
      oldPrice: "KES 78,000",
      discount: "-13%",
      badge: "PRO",
      image: "https://via.placeholder.com/320x220?text=Camera",
    },
  ],
  Gaming: [
    {
      id: "gaming-1",
      name: "Wireless Game Controller",
      specs: "Ergonomic • RGB",
      price: "KES 4,200",
      oldPrice: "KES 5,200",
      discount: "-19%",
      badge: "GAMER",
      image: "https://via.placeholder.com/320x220?text=Controller",
    },
  ],
};

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [feedback, setFeedback] = useState("");

  const selectedProducts = selectedCategory
    ? categoryProducts[selectedCategory] || []
    : [];

  function handleCategoryClick(title) {
    setSelectedCategory(title);
    setFeedback("");
  }

  function handleAddToCart(productName) {
    setCartCount((count) => count + 1);
    setFeedback(`${productName} added to cart.`);
  }

  return (
    <section className="categories">
      <div className="categories-shell">
        <div className="categories-heading">
          <span className="categories-badge">Shop by Category</span>
          <h2>Explore the latest tech collections</h2>
          <p>
            Choose the electronics category you’re looking for and discover the
            best devices with confidence.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((item) => (
            <article
              className={`category-card ${item.accent} ${
                selectedCategory === item.title ? "selected" : ""
              }`}
              key={item.title}
              role="button"
              tabIndex={0}
              onClick={() => handleCategoryClick(item.title)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  handleCategoryClick(item.title);
                }
              }}
            >
              <div className="card-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>Discover top picks</p>
            </article>
          ))}
        </div>

        <div className="category-results">
          <div className="results-header">
            <div>
              <h3>
                {selectedCategory
                  ? `${selectedCategory} products`
                  : "Tap a category to see matching products"}
              </h3>
              {selectedCategory && (
                <p className="category-summary">
                  Showing popular items, price discounts, and quick add-to-cart
                  actions.
                </p>
              )}
            </div>
            <div className="cart-summary">
              <span>Cart items: {cartCount}</span>
            </div>
          </div>

          {feedback && <div className="feedback">{feedback}</div>}

          {selectedProducts.length > 0 ? (
            <div className="category-product-grid">
              {selectedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.specs}
                  badge={product.badge}
                  discount={product.discount}
                  oldPrice={product.oldPrice}
                  buttonLabel="Add to Cart"
                  onButtonClick={() => handleAddToCart(product.name)}
                  variant="featured"
                />
              ))}
            </div>
          ) : selectedCategory ? (
            <div className="no-results">
              No matching products are available in {selectedCategory} right now.
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default Categories;
