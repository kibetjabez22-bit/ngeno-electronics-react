import "./Reviews.css";
import { Star, ShieldCheck } from "lucide-react";

function Reviews() {
  const reviews = [
    {
      name: "Edmund Ngeno",
      text:
        "Laptop arrived in perfect condition, exactly as described. Fast delivery to Nairobi.",
    },
    {
      name: "Allan Mutai",
      text:
        "Bought a refurbished phone — it looks brand new. Ngenos Electronics is legit.",
    },
    {
      name: "James Mwairimu",
      text:
        "Great prices, paid via M-Pesa and received my tablet the next day.",
    },
  ];

  return (
    <section className="reviews">
      <div className="reviews-shell">
        <div className="reviews-header">
          <span className="reviews-badge">Trusted by Customers</span>
          <h2>What our customers say</h2>
          <p>
            Real buyers, real experiences, and dependable service from Ngenos
            Electronics.
          </p>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-top">
                <div className="avatar">{review.name.charAt(0)}</div>

                <div>
                  <h4>{review.name}</h4>
                  <div className="review-meta">
                    <ShieldCheck size={14} />
                    <span>Verified Buyer</span>
                  </div>
                </div>
              </div>

              <div className="stars" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} size={15} fill="currentColor" />
                ))}
              </div>

              <p className="review-text">“{review.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Reviews;