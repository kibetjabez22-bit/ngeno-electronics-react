import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/background.png";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, wishlistCount, user } = useContext(StoreContext);

  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const previouslyFocused = useRef(null);

  const navItems = [
    { label: "HOME", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Wishlist", to: "/wishlist" },
    { label: "Orders", to: "/orders" },
    ...(user?.isAdmin ? [{ label: "ADMIN", to: "/admin" }] : []),
  ];

  // Focus management: trap focus inside mobile menu when open and restore focus on close
  const handleKeyDown = useCallback(
    (e) => {
      if (!menuOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        const container = menuRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')
        ).filter((el) => !el.hasAttribute('disabled'));
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    if (menuOpen) {
      // save previously focused element
      previouslyFocused.current = document.activeElement;

      // set aria-hidden on sibling content so screen readers don't jump out
      const appChildren = document.querySelectorAll('.app-shell > *');
      appChildren.forEach((el) => {
        if (!el.classList.contains('navbar')) {
          el.setAttribute('aria-hidden', 'true');
        }
      });

      // focus first focusable item inside menu
      const container = menuRef.current;
      const focusable = container
        ? Array.from(container.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'))
        : [];
      if (focusable.length > 0) focusable[0].focus();

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    // cleanup: remove aria-hidden and restore focus
    const appChildren = document.querySelectorAll('.app-shell > *');
    appChildren.forEach((el) => el.removeAttribute('aria-hidden'));
    if (previouslyFocused.current) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
    }
    return undefined;
  }, [menuOpen, handleKeyDown]);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link" aria-label="Go to home">
          <img src={logo} alt="Ngenos Electronics" />
        </Link>
      </div>

      <nav ref={menuRef} className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary">
        <ul className="nav-list">
          {navItems.map((item, idx) => (
            <li key={item.to} style={{ ['--i']: idx }}>
              <NavLink
                to={item.to}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="right-menu">
        <button type="button" className="icon-btn" aria-label="Search">
          <Search size={10} />
        </button>

        <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
          <Heart size={10} />
          {wishlistCount > 0 ? <span className="badge">{wishlistCount}</span> : null}
        </Link>

        {user ? (
          <Link to="/account" className="signin-btn">
            {user.name}
          </Link>
        ) : (
          <>
            <Link to="/signin" className="signin-btn">
              Sign In
            </Link>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </>
        )}

        <Link to="/cart" className="cart-btn glow-cart" aria-label="Cart">
          <ShoppingCart size={15} />
          <span className="cart-count">{cartCount}</span>
        </Link>

        <button
          type="button"
          ref={toggleRef}
          className="menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
        >
          {menuOpen ? <X size={15} /> : <Menu size={15} />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;