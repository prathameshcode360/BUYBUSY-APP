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
        }}>
        {children}
      </productContext.Provider>
    </>
  );
}
export default ProductCustomProvider;
