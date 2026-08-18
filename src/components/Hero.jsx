import { motion } from "framer-motion";
import "./Hero.css";

function Hero() {
  const taglineWords = ["QUALITY.", "TRUSTED.", "TECHNOLOGY."];

  return (
    <section className="hero">
      {/* Background effects */}
      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>
      <div className="hero-grid"></div>
      <div className="hero-vignette"></div>

      <div className="overlay">

        {/* Premium eyebrow */}
        <motion.div
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="eyebrow-dot"></span>
          Kenya's Trusted Electronics Marketplace
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          NGENOS
          <span> ELECTRONICS</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Discover premium electronics, trusted technology
          and exceptional value — all in one marketplace.
        </motion.p>

        {/* Tagline */}
        <motion.div
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          {taglineWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.15,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <motion.a
            href="#products"
            className="hero-btn primary-btn"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Shop Now
            <span className="btn-arrow">→</span>
          </motion.a>

          <motion.a
            href="#categories"
            className="hero-btn secondary-btn"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Categories
          </motion.a>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="hero-trust"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
        >
          <div className="trust-item">
            <strong>✓</strong>
            <span>Trusted Sellers</span>
          </div>

          <div className="trust-divider"></div>

          <div className="trust-item">
            <strong>✓</strong>
            <span>Secure Payments</span>
          </div>

          <div className="trust-divider"></div>

          <div className="trust-item">
            <strong>✓</strong>
            <span>Kenya-wide Delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 6, 0],
        }}
        transition={{
          opacity: {
            duration: 0.8,
            delay: 1,
          },
          y: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <span className="scroll-mouse">
          <span className="scroll-wheel"></span>
        </span>

        <span className="scroll-label">Scroll to explore</span>
      </motion.div>
    </section>
  );
}

export default Hero;