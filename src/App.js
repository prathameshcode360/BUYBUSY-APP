import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import ProductCustomProvider from "./Context/ProductContext";
import AuthProvider from "./Context/AuthContext";

import HomePage from "./Pages/Home/HomePage";
import Cart from "./Pages/Cart/Cart";
import Orders from "./Pages/Orders/Orders";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import ErrorPage from "./Components/ErrorPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },

        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "orders",
          element: (
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <ProductCustomProvider>
        <RouterProvider router={router} />
      </ProductCustomProvider>
    </AuthProvider>
  );
}

export default App;
