import { useContext } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { CartContext } from "../context/CartContext.jsx";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="group  bg-dark rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">

      {/* IMAGE + INFO clickable */}
      <Link to={`/product/${product._id}`} className="flex-1">
     

        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={
              product.imageUrl ||
              "https://images.unsplash.com/photo-1541643600914-78b084683601"
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <span className="absolute top-3 left-3 bg-[#0f172a] text-[#f59e0b] text-xs font-semibold px-2.5 py-1 rounded uppercase">
            {product.category}
          </span>

          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-gray-600 hover:text-red-500"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>

        {/* Details */}
        <div className="p-5">
          <p className="text-xs text-amber-600 font-semibold">
            {product.brand}
          </p>

          <h3 className="text-lg font-serif text-gray-900 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {product.description}
          </p>

          <p className="text-xl font-bold text-gray-900 mt-3">
            Rs. {product.price}
          </p>
        </div>

      </Link>

      {/* BUTTON OUTSIDE LINK (IMPORTANT FIX) */}
      <div className="p-5 pt-0">
        <button
          onClick={() => addToCart(product)}
          className="w-full flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Add To Cart
        </button>
      </div>

    </div>
  );
};

export default ProductCard;