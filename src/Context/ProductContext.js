import { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseInit";
import { useAuthContext } from "./AuthContext";
import products from "../Data/data";

const productContext = createContext();

/* ================= CUSTOM HOOK ================= */
export function useProductContextValue() {
  return useContext(productContext);
}

/* ================= PROVIDER ================= */
function ProductCustomProvider({ children }) {
  const { user } = useAuthContext();

  /* ---------- FILTER STATES ---------- */
  const [maxPrice, setMaxPrice] = useState(5000);
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  /* ---------- CART & ORDER STATES ---------- */
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);

  /* ---------- UI MESSAGE ---------- */
  const [message, setMessage] = useState("");

  /* ---------- FILTER LOGIC ---------- */
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(text.toLowerCase());
    const matchPrice = product.price <= maxPrice;
    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchSearch && matchPrice && matchCategory;
  });

  /* ---------- AUTO CLEAR MESSAGE ---------- */
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [message]);

  /* ---------- REAL-TIME CART LISTENER ---------- */
  useEffect(() => {
    if (!user) {
      setCart([]);
      setTotal(0);
      return;
    }

    const cartRef = collection(db, "users", user.uid, "cart");

    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const cartItems = [];
      let totalPrice = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        cartItems.push(data);
        totalPrice += data.price * data.qty;
      });

      setCart(cartItems);
      setTotal(totalPrice);
    });

    return () => unsubscribe();
  }, [user]);

  /* ---------- REAL-TIME ORDERS LISTENER ---------- */
  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersRef = collection(db, "users", user.uid, "orders");

    const unsubscribe = onSnapshot(ordersRef, (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        ordersData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setOrders(ordersData);
    });

    return () => unsubscribe();
  }, [user]);

  /* ---------- FILTER HANDLERS ---------- */
  function handleSearch(text) {
    setText(text);
  }

  function handleMaxPrice(value) {
    setMaxPrice(value);
  }

  function handleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  }

  /* ---------- CART HANDLERS (WRITE ONLY) ---------- */
  async function addToCart(product) {
    if (!user) return;

    const productRef = doc(
      db,
      "users",
      user.uid,
      "cart",
      product.id.toString(),
    );

    const existing = cart.find((p) => p.id === product.id);

    if (existing) {
      await updateDoc(productRef, {
        qty: existing.qty + 1,
      });
      setMessage("Product count increased");
    } else {
      await setDoc(productRef, {
        ...product,
        qty: 1,
      });
      setMessage("Product added to cart");
    }
  }

  async function decreaseCartCount(product) {
    if (!user) return;

    const productRef = doc(
      db,
      "users",
      user.uid,
      "cart",
      product.id.toString(),
    );

    const existing = cart.find((p) => p.id === product.id);
    if (!existing) return;

    if (existing.qty > 1) {
      await updateDoc(productRef, {
        qty: existing.qty - 1,
      });
    } else {
      await deleteDoc(productRef);
    }
  }

  async function removeFromCart(product) {
    if (!user) return;

    const productRef = doc(
      db,
      "users",
      user.uid,
      "cart",
      product.id.toString(),
    );

    await deleteDoc(productRef);
    setMessage("Product removed from cart");
  }

  /* ---------- PURCHASE ---------- */
  async function handlePurchase() {
    if (!user || cart.length === 0) return;

    const ordersRef = collection(db, "users", user.uid, "orders");

    await addDoc(ordersRef, {
      date: new Date().toLocaleDateString(),
      items: cart,
      total,
    });

    // clear cart
    const cartRef = collection(db, "users", user.uid, "cart");
    cart.forEach(async (item) => {
      const ref = doc(cartRef, item.id.toString());
      await deleteDoc(ref);
    });

    setMessage("Order placed successfully");
  }

  /* ---------- CONTEXT VALUE ---------- */
  return (
    <productContext.Provider
      value={{
        filteredProducts,
        text,
        maxPrice,
        cart,
        total,
        orders,
        message,
        handleSearch,
        handleMaxPrice,
        handleCategory,
        addToCart,
        decreaseCartCount,
        removeFromCart,
        handlePurchase,
      }}>
      {children}
    </productContext.Provider>
  );
}

export default ProductCustomProvider;
