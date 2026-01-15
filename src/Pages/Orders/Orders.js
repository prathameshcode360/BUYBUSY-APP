import { useProductContextValue } from "../../Context/ProductContext";
import styles from "./Orders.module.css";

function Orders() {
  const { orders } = useProductContextValue();
  return (
    <>
      <div className={styles.ordersContainer}>
        <h2>Your Orders</h2>
        {orders.map((order, orderIndex) => (
          <div key={orderIndex} className={styles.ordersTable}>
            <span>Ordered On: {order.date}</span>

            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.qty}</td>
                    <td>{item.price * item.qty}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan="3">Order Total</td>
                  <td>{order.total}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        ))}{" "}
      </div>
    </>
  );
}

export default Orders;
