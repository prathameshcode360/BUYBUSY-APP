import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ProductCustomProvider from "./Context/ProductContext";
import HomePage from "./Pages/Home/HomePage";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "cart", element: <Cart /> },
        { path: "orders", element: <Orders /> },
      ],
    },
  ]);

  return (
    <ProductCustomProvider>
      <RouterProvider router={router} />
    </ProductCustomProvider>
  );
}

export default App;
