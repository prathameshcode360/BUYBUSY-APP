import { createContext, useContext, useState } from "react";
import products from "../Data/data";

const productContext = createContext();

//Custom Hook
export function useProductContextValue() {
  const value = useContext(productContext);
  return value;
}

//Provider
function ProductCustomProvider({ children }) {
  const [maxPrice, setMaxPrice] = useState(5000);
  const [text, setText] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orders, setOrders] = useState([]);

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(text.toLowerCase());

    const matchPrice = product.price <= maxPrice;

    const matchCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    return matchSearch && matchPrice && matchCategory;
  });

  function handleCategory(category) {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }

  function handleSearch(text) {
    setText(text);
  }

  function handleMaxPrice(value) {
    setMaxPrice(value);
  }

  function addToCart(product) {
    setCart((prev) => {
      const index = prev.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        return prev.map((item, i) =>
          i === index ? { ...item, qty: item.qty + 1 } : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });

    setTotal((prev) => prev + product.price);
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
  }

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
  }

  return (
    <>
      <productContext.Provider
        value={{
          filteredProducts,
          handleSearch,
          text,
          maxPrice,
          handleMaxPrice,
          handleCategory,
          cart,
          addToCart,
          removeFromCart,
          decreaseCartCount,
          total,
          handlePurchase,
          orders,
        }}>
        {children}
      </productContext.Provider>
    </>
  );
}
export default ProductCustomProvider;
