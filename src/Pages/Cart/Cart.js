import { useProductContextValue } from "../../Context/ProductContext";
import styles from "./Cart.module.css";
function Cart() {
  const {
    cart,
    removeFromCart,
    decreaseCartCount,
    addToCart,
    total,
    handlePurchase,
    message,
  } = useProductContextValue();
  console.log(cart);
  return (
    <>
      {message && (
        <div className="message-container">
          <span>{message}</span>
        </div>
      )}
      <div className={styles.cartCotainer}>
        {cart.map((item) => (
          <div className={styles.cartItem}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <span>{item.price}</span>
            <div className={styles.increaseQuntity}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
                alt="increase"
                onClick={() => addToCart(item)}
              />
              <span>{item.qty}</span>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png"
                alt="decrease"
                onClick={() => decreaseCartCount(item)}
              />
            </div>
            <button onClick={() => removeFromCart(item)}>
              Remove From Cart
            </button>
          </div>
        ))}
      </div>
      <div className={styles.totalCartPrice}>
        <span>Total:{total}</span>
        <button onClick={handlePurchase}>Purches</button>
      </div>
    </>
  );
}

export default Cart;
