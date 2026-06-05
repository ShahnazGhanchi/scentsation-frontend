import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import Shop from "./pages/Shop";
import AdminDashboard from "./components/AdminDashboard";
import ProductDetail from "./components/ProductDetail";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";
// Home Page
const Home = () => {
  return (
    <div className="min-h-screen  bg-amber-100">

      {/* Hero Section */}
      <div className="text-center px-6 py-20">

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900">
          Welcome to Scentsation 
        </h1>

        <p className="text-black mt-4 text-lg max-w-2xl mx-auto">
          Discover luxury fragrances that define your personality.
          Explore premium perfumes for Men, Women & Unisex collection.
        </p>

        {/* Explore Button */}
        <div className="mt-8">
      <Link
    to="/Shop"
    className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-semibold transition inline-block"
  >
    Explore Collection
  </Link>
</div>

      </div>

      {/* Feature Section */}
      <div className="grid md:grid-cols-3 gap-8 px-10 pb-20">

        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-bold">Luxury Perfumes</h3>
          <p className="text-black mt-2">
            Premium quality fragrances from top brands.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text- xl font-bold">Fast Delivery</h3>
          <p className="text-black mt-2">
            Quick and safe delivery to your doorstep.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl text-center">
          <h3 className="text-xl font-bold">Best Prices</h3>
          <p className="text-black mt-2">
            Affordable luxury for everyone.
          </p>
        </div>

      </div>

    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>

        <footer className="bg-[#0f172a] text-gray-400 py-6 text-center text-sm border-t border-gray-800">
          &copy; {new Date().getFullYear()} Scentsation Premium Fragrances
        </footer>

      </Router>
    </CartProvider>
  );
}

export default App;