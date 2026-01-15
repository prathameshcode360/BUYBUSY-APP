import { createContext, useContext, useEffect, useState } from "react";
import products from "../Data/data";

const productContext = createContext();

/* ================= CUSTOM HOOK ================= */
export function useProductContextValue() {
  return useContext(productContext);
}

/* ================= PROVIDER ================= */
function ProductCustomProvider({ children }) {
  /* ---------- FILTER STATES ---------- */
  const [maxPrice, setMaxPrice] = useState(5000);
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  /* ---------- CART STATES ---------- */
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  /* ---------- ORDER STATES ---------- */
  const [orders, setOrders] = useState([]);

  /* ---------- UI STATE ---------- */
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

  /* ---------- MESSAGE AUTO CLEAR ---------- */
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 2000);
    return () => clearTimeout(timer);
  }, [message]);

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
        : [...prev, category]
    );
  }

  /* ---------- CART HANDLERS ---------- */
  function addToCart(product) {
    let messageText = "";

    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        messageText = "Product count increased";
        return prev.map((item, i) =>
          i === index ? { ...item, qty: item.qty + 1 } : item
        );
      }

      messageText = "Product added to cart successfully";
      return [...prev, { ...product, qty: 1 }];
    });

    setTotal((prev) => prev + product.price);
    setMessage(messageText);
  }

  function decreaseCartCount(product) {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);
      if (index === -1) return prev;

      const item = prev[index];

      if (item.qty > 1) {
        return prev.map((p, i) => (i === index ? { ...p, qty: p.qty - 1 } : p));
      }

      return prev.filter((p) => p.id !== product.id);
    });

    setTotal((prev) => prev - product.price);
  }

  function removeFromCart(product) {
    const item = cart.find((p) => p.id === product.id);
    if (!item) return;

    setCart((prev) => prev.filter((p) => p.id !== product.id));
    setTotal((prev) => prev - item.price * item.qty);
    setMessage("Product removed from cart successfully");
  }

  /* ---------- ORDER HANDLER ---------- */
  function handlePurchase() {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cart,
      total: total,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    setTotal(0);
    setMessage("Order successful");
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
