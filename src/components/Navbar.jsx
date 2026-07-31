import {
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";

import "./Navbar.css";

import logo from "../assets/background.png";

import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

import { StoreContext } from "../context/StoreContext";

function Navbar() {
  const navigate = useNavigate();

  const {
    products,
    cartCount,
    wishlistCount,
    user,
    searchQuery,
    setSearchQuery,
  } = useContext(StoreContext);

  /* ===========================
      STATE
  =========================== */

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const toggleRef = useRef(null);

  const previouslyFocused = useRef(null);

  /* ===========================
      NAVIGATION
  =========================== */

  const navItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Products",
      to: "/products",
    },
    {
      label: "Wishlist",
      to: "/wishlist",
    },
    {
      label: "Orders",
      to: "/orders",
    },

    ...(user?.isAdmin
      ? [
          {
            label: "Admin",
            to: "/admin",
          },
        ]
      : []),
  ];

  /* ===========================
      SEARCH
  =========================== */

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return products
      .filter((product) =>
        product.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .slice(0, 6);
  }, [products, searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSelect = (product) => {
    setSearchQuery("");
    setSearchOpen(false);
    navigate(`/product/${product.id}`);
  };

  /* ===========================
      MENU
  =========================== */

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  /* ===========================
      ACCESSIBILITY
  =========================== */

  const handleKeyDown = useCallback(
    (event) => {
      if (!menuOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        toggleRef.current?.focus();
      }
    },
    [menuOpen]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [handleKeyDown]);

  /* ===========================
      CLOSE MENU
  =========================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        closeMenu();
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  /* ===========================
      FOCUS
  =========================== */

  useEffect(() => {
    if (menuOpen) {
      previouslyFocused.current =
        document.activeElement;
    } else {
      previouslyFocused.current?.focus();
    }
  }, [menuOpen]);

  /* ===========================
      JSX STARTS IN PART 1B
  =========================== */

  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link" aria-label="Go to home">
          <img src={logo} alt="Ngenos Electronics" />
        </Link>
      </div>

      <nav ref={menuRef} 
      className={`nav-links ${menuOpen ? "open" : ""}`} 
      aria-label="Primary"
      >
        <ul className="nav-list">
          {navItems.map((item, idx) => (
            <li key={item.to} style={{ ['--i']: idx }}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>(isActive ?"active":"")}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
                
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="right-menu">
  {/* Search */}
  <button
    type="button"
    className="icon-btn desktop-only"
    aria-label="Search"
  >
    <Search size={22} />
  </button>

  {/* Wishlist */}
  <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
    <Heart size={22} />
    {wishlistCount > 0 && (
      <span className="badge">{wishlistCount}</span>
    )}
  </Link>

  {/* Cart */}
  <Link to="/cart" className="cart-btn" aria-label="Cart">
    <ShoppingCart size={22} />
    {cartCount > 0 && (
      <span className="cart-count">{cartCount}</span>
    )}
  </Link>

  {/* Desktop Sign In / Sign Up */}
  {!user ? (
    <>
      <Link to="/signin" className="signin-btn desktop-only">
        Sign In
      </Link>

      <Link to="/signup" className="signup-btn desktop-only">
        Sign Up
      </Link>
    </>
  ) : (
    <Link to="/account" className="signin-btn">
      {user.name}
    </Link>
  )}

  {/* Hamburger Menu */}
  <button
    type="button"
    ref={toggleRef}
    className="menu-toggle"
    aria-label={menuOpen ? "Close menu" : "Open menu"}
    aria-expanded={menuOpen}
    aria-controls="primary-navigation"
    onClick={() => setMenuOpen((prev) => !prev)}
  >
    {menuOpen ? <X size={28} /> : <Menu size={28} />}
  </button>
</div>
      {menuOpen && (
  <div
    className="menu-overlay"
    onClick={() => setMenuOpen(false)}
  />
)}
    </header>
  );
}

export default Navbar;