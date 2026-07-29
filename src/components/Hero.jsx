import { motion } from "framer-motion";
import "./Hero.css";

function Hero() {
  const taglineWords = ["QUALITY.", "TRUSTED.", "TECHNOLOGY."];

  return (
    <section className="hero">
      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>

      <div className="overlay">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Trusted Electronics Marketplace
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          NGENOS ELECTRONICS
        </motion.h1>

        <motion.div
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {taglineWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          href="#products"
          className="hero-btn"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.98 }}
        >
          Shop Now
        </motion.a>
      </div>

      <motion.div
        className="scroll-indicator"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{
          duration: 1.5,
          delay: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <span className="scroll-mouse">
          <span className="scroll-wheel"></span>
        </span>
        <span className="scroll-label">Scroll</span>
      </motion.div>
    </section>
  );
}

export default Hero;