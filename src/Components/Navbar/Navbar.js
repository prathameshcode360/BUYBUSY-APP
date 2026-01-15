import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.rightNav}>
        <h3>BUY BUSY</h3>
      </div>
      <div className={styles.leftNav}>
        <div className={styles.navIconHome}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/619/619153.png"
            alt="home-icon"
          />
          <span>Home</span>
        </div>
        <div className={styles.navIconOrders}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/17241/17241740.png"
            alt="order-icon"
          />
          <span>Orders</span>
        </div>
        <div className={styles.navIconCart}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/8381/8381572.png"
            alt="cart-icon"
          />
          <span>Cart</span>
        </div>
        <div className={styles.navIconSignIn}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/8944/8944312.png"
            alt="signIn-icon"
          />
          <span>SignIn</span>
        </div>
        <div className={styles.navIconHome}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/8944/8944312.png"
            alt="logout-icon"
          />
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
