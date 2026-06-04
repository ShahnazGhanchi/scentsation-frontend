import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, ShieldAlert, Sparkles } from 'lucide-react';
import { CartContext } from '../context/CartContext'; // <-- Import CartContext

const Navbar = () => {
    const { cartCount,cartItems } = useContext(CartContext);
    
     // <-- Cart count global state se
  return (
    <nav className="bg-white text-gray-900 sticky top-0 z-50 shadow-md border-b-2 border-amber-500/30 py-2">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Side: Brand Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex flex-col items-start group">
              <span className="text-2xl md:text-3xl font-serif tracking-[0.15em] font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors duration-300">
                SCENTSATION
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-amber-600 font-bold mt-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" /> LUXURY FRAGRANCE
              </span>
            </Link>
          </div>

          {/* Center: Navigation Links -  */}
          <div className="flex space-x-10 text-base font-bold tracking-wide text-slate-700">
            <Link to="/" className="hover:text-amber-600 hover:scale-105 transition-all duration-200 py-2">
              Home
            </Link>
            <Link to="/shop" className="hover:text-amber-600 hover:scale-105 transition-all duration-200 py-2">
              Shop All
            </Link>
          </div>

          {/* Right Side: Icons Menu - */}
          <div className="flex items-center space-x-6">
            
            {/* Wishlist Icon */}
            <button className="text-slate-700 hover:text-amber-600 transition-colors duration-200 relative p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-6 h-6 stroke-[2]" />
              <span className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
                0
              </span>
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="text-slate-700 hover:text-amber-600 transition-colors duration-200 relative p-2 hover:bg-gray-100 rounded-full">
              <ShoppingBag className="w-6 h-6 stroke-[2]" />
              <span className="absolute top-0 right-0 bg-amber-600 text-white text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow">
               {cartCount}
              </span>
            </Link>

            {/* Admin Dashboard */}
            <Link to="/admin" className="text-gray-400 hover:text-red-600 transition-colors duration-200 p-2 hover:bg-red-50 rounded-full" title="Admin Control">
              <ShieldAlert className="w-6 h-6 stroke-[2]" />
            </Link>
            
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;