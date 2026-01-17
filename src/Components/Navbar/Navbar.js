import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseInit";
import { useAuthContext } from "../../Context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user } = useAuthContext();

  function handleLogout() {
    signOut(auth);
  }

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.rightNav}>
          <h3>BUY BUSY</h3>
        </div>

        <div className={styles.leftNav}>
          {/* Home always visible */}
          <Link to="/">
            <div className={styles.navIconHome}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/619/619153.png"
                alt="home-icon"
              />
              <span>Home</span>
            </div>
          </Link>

          {/* Logged-in user */}
          {user && (
            <>
              <Link to="/orders">
                <div className={styles.navIconOrders}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/17241/17241740.png"
                    alt="order-icon"
                  />
                  <span>Orders</span>
                </div>
              </Link>

              <Link to="/cart">
                <div className={styles.navIconCart}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8381/8381572.png"
                    alt="cart-icon"
                  />
                  <span>Cart</span>
                </div>
              </Link>

              <div className={styles.navIconHome} onClick={handleLogout}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8944/8944312.png"
                  alt="logout-icon"
                />
                <span>Logout</span>
              </div>
            </>
          )}

          {/* Not logged-in user */}
          {!user && (
            <Link to="/login">
              <div className={styles.navIconSignIn}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8944/8944312.png"
                  alt="signIn-icon"
                />
                <span>SignIn</span>
              </div>
            </Link>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
}

export default Navbar;
