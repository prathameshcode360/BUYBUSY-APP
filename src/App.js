import Navbar from "./Components/Navbar/Navbar";
import ProductCustomProvider from "./Context/ProductContext";
import HomePage from "./Pages/Home/HomePage";

function App() {
  return (
    <>
      <div className="App">
        <ProductCustomProvider>
          <Navbar />
          <HomePage />
        </ProductCustomProvider>
      </div>
    </>
  );
}

export default App;
