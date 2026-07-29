import { createContext, useEffect, useMemo, useState } from "react";
import { products as productData, categories } from "../data/products";

// Firebase Auth + Firestore
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const defaultState = {
  products: productData,
  cart: [],
  wishlist: [],
  user: null,
  orders: [],
  searchQuery: "",
  categoryFilter: "",
};

export const StoreContext = createContext(defaultState);

function parseLocalStorage(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => parseLocalStorage("ngeno-cart", []));
  const [wishlist, setWishlist] = useState(() => parseLocalStorage("ngeno-wishlist", []));
  const [products, setProducts] = useState(productData);
  // We'll rely on Firebase to provide auth state; initialize as null and sync with onAuthStateChanged
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(() => parseLocalStorage("ngeno-orders", []));
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(false);


  useEffect(() => {
    window.localStorage.setItem("ngeno-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("ngeno-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    window.localStorage.setItem("ngeno-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    window.localStorage.setItem("ngeno-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        if (!snapshot.empty) {
          setProducts(
            snapshot.docs.map((docItem) => ({
              id: Number(docItem.id) || docItem.id,
              ...docItem.data(),
            }))
          );
        }
      } catch (err) {
        console.warn("Unable to load products from Firestore:", err.message);
      }
    };

    loadProducts();
  }, []);

  // Listen for Firebase auth state changes and keep `user` in sync,
  // also fetch user doc from Firestore to get role information and orders.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      const syncUserData = async () => {
        if (!fbUser) {
          setUser(null);
          setOrders(parseLocalStorage("ngeno-orders", []));
          return;
        }

        try {
          const udoc = await getDoc(doc(db, "users", fbUser.uid));
          const baseUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email.split("@")[0],
            isAdmin: false,
            emailVerified: fbUser.emailVerified,
          };

          if (udoc.exists()) {
            const data = udoc.data();
            setUser({
              ...baseUser,
              name: fbUser.displayName || data.name || baseUser.name,
              isAdmin: data.role === "admin",
            });
          } else {
            await setDoc(doc(db, "users", fbUser.uid), {
              email: fbUser.email,
              name: fbUser.displayName || fbUser.email.split("@")[0],
              role: "customer",
              createdAt: serverTimestamp(),
            });
            setUser(baseUser);
          }

          const ordersSnapshot = await getDocs(
            query(
              collection(db, "orders"),
              where("userId", "==", fbUser.uid),
              orderBy("createdAt", "desc")
            )
          );
          setOrders(
            ordersSnapshot.docs.map((orderDoc) => {
              const orderData = orderDoc.data();
              return {
                id: orderDoc.id,
                ...orderData,
                placedAt: orderData.placedAt?.toDate ? orderData.placedAt.toDate().toISOString() : orderData.placedAt,
              };
            })
          );
        } catch (err) {
          console.warn("Firebase auth sync error:", err.message);
          setUser({
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email.split("@")[0],
            isAdmin: false,
            emailVerified: fbUser.emailVerified,
          });
        }
      };

      syncUserData();
    });
    return () => unsubscribe();
  }, []);


  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const addToCart = (product, quantity = 1) => {
    setCart((currentCart) => {
      const foundIndex = currentCart.findIndex((item) => item.id === product.id);
      if (foundIndex >= 0) {
        const updated = [...currentCart];
        updated[foundIndex].quantity += quantity;
        return updated;
      }
      return [...currentCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    setWishlist((currentWishlist) => {
      if (currentWishlist.includes(productId)) {
        return currentWishlist.filter((id) => id !== productId);
      }
      return [...currentWishlist, productId];
    });
  };

  const signIn = async ({ email, password }) => {
    setLoadingAuth(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will update user
      setLoadingAuth(false);
      return { success: true };
    } catch (err) {
      setLoadingAuth(false);
      return { success: false, message: err.message };
    }
  };

  const signUp = async ({ email, password, name }) => {
    setLoadingAuth(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(cred.user, { displayName: name });
      }
      // create a users doc
      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        name: name || cred.user.displayName || email.split("@")[0],
        role: "customer",
        createdAt: serverTimestamp(),
      });

      // send verification email
      try {
        await sendEmailVerification(cred.user);
      } catch (vErr) {
        // ignore but return info
        console.warn("Verification email error:", vErr.message);
      }

      setLoadingAuth(false);
      return { success: true };
    } catch (err) {
      setLoadingAuth(false);
      return { success: false, message: err.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const resendVerificationEmail = async () => {
    if (!auth.currentUser) {
      return { success: false, message: "No signed-in user available." };
    }
    try {
      await sendEmailVerification(auth.currentUser);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const signOut = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const placeOrder = async ({ paymentMethod, phone, email }) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderData = {
      userId: user?.uid || null,
      items: cart,
      subtotal,
      shipping: 800,
      total: subtotal + 800,
      status: "Processing",
      placedAt: serverTimestamp(),
      paymentMethod,
      paymentPhone: phone,
      receiptEmail: email,
    };

    let order = {
      id: `ORD-${Date.now()}`,
      ...orderData,
      placedAt: new Date().toISOString(),
    };

    if (user?.uid) {
      try {
        const created = await addDoc(collection(db, "orders"), orderData);
        order = { id: created.id, ...orderData, placedAt: order.placedAt };
      } catch (err) {
        console.warn("Failed to save order to Firestore:", err.message);
      }
    }

    setOrders((currentOrders) => [order, ...currentOrders]);
    clearCart();
    return order;
  };

  const sendReceipt = (orderId) => {
    const order = orders.find((item) => item.id === orderId);
    if (!order) {
      return { success: false, message: "Order not found." };
    }
    return { success: true, message: `Receipt sent to ${order.receiptEmail || "your email"}.` };
  };

  const value = {
    products,
    categories,
    cart,
    wishlist,
    user,
    orders,
    searchQuery,
    categoryFilter,
    cartCount,
    wishlistCount,
    loadingAuth,
    setSearchQuery,
    setCategoryFilter,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleWishlist,
    signIn,
    signUp,
    signOut,
    resetPassword,
    resendVerificationEmail,
    placeOrder,
    sendReceipt,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
