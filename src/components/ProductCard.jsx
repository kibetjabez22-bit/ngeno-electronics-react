import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({
  name,
  price,
  image,
  description,
  badge,
  discount,
  oldPrice,
  rating = "★★★★★",
  buttonLabel,
  buttonTo,
  onButtonClick,
  onWishlistToggle,
  isFavorite = false,
  variant = "default",
}) {
  const isImageUrl =
    typeof image === "string" &&
    image.trim() !== "" &&
    (image.startsWith("http") ||
      image.startsWith("data:") ||
      image.startsWith("/") ||
      /\.(png|jpe?g|gif|svg)(\?.*)?$/i.test(image));

  return (
    <article className={`product-card ${variant === "featured" ? "product-card--featured" : ""}`}>
      {variant === "featured" && discount ? (
        <span className="product-card__discount">{discount}</span>
      ) : null}

      <div className="product-card__media">
        {isImageUrl ? (
          <img src={image} alt={name} className="product-card__image" />
        ) : (
          <div className="product-card__placeholder">{image || "📦"}</div>
        )}
      </div>

      {variant === "featured" && badge ? (
        <span className="product-card__badge">{badge}</span>
      ) : null}

      {onWishlistToggle ? (
        <button
          type="button"
          className={`product-card__favorite ${isFavorite ? "favorite" : ""}`}
          onClick={onWishlistToggle}
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      ) : null}

      <h3 className="product-card__title">{name}</h3>

      {description ? <p className="product-card__description">{description}</p> : null}

      {variant === "featured" ? (
        <div className="product-card__rating" aria-label="5 star rating">
          {rating}
        </div>
      ) : null}

      <div className="product-card__price-row">
        <h2 className="product-card__price">{price}</h2>
        {variant === "featured" && oldPrice ? <del>{oldPrice}</del> : null}
      </div>

      {buttonLabel ? (
        buttonTo ? (
          <Link to={buttonTo} className="product-card__link">
            <button type="button" className="product-card__button">
              {buttonLabel}
            </button>
          </Link>
        ) : (
          <button
            type="button"
            className="product-card__button"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </button>
        )
      ) : null}
    </article>
  );
}

export default ProductCard;
