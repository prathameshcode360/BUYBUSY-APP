import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useProductContextValue } from "../../Context/ProductContext";
import styles from "./HomePage.module.css";

function HomePage() {
  const {
    filteredProducts,
    handleSearch,
    text,
    maxPrice,
    handleMaxPrice,
    handleCategory,
    addToCart,
    message,
  } = useProductContextValue();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  function handleAdd(product) {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
  }

  return (
    <>
      {message && (
        <div className="message-container">
          <span>{message}</span>
        </div>
      )}

      <div className={styles.searchBar}>
        {" "}
        <input
          type="text"
          placeholder="search products by name...."
          value={text}
          onChange={(e) => handleSearch(e.target.value)}
        />{" "}
      </div>

      <div className={styles.pageContainer}>
        <div className={styles.productsList}>
          {filteredProducts.map((product, index) => (
            <div key={index} className={styles.productCard}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <span>{product.price}</span>
              <button onClick={() => handleAdd(product)}>Add To Cart</button>
            </div>
          ))}
        </div>

        <div className={styles.filter}>
          <div className={styles.priceFilter}>
            <span>Price: {maxPrice}</span>
            <input
              type="range"
              min="0"
              max="5000"
              onChange={(e) => handleMaxPrice(e.target.value)}
            />
          </div>

          <div className={styles.categoryFilter}>
            <span>Categories</span>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategory("Mobiles")}
              />
              Mobiles
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategory("Laptops")}
              />
              Laptops
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategory("Accessories")}
              />
              Accessories
            </label>
            <label>
              <input
                type="checkbox"
                onChange={() => handleCategory("Wearables")}
              />
              Wearables
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
