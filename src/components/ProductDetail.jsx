import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/${id}`
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
  <div className="min-h-screen bg-amber-100 py-10 px-4">

    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 gap-8">

      {/* Image Section */}
      <div className="bg-gray-100 flex items-center justify-center p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-[400px] object-cover rounded-xl shadow-md hover:scale-105 transition"
        />
      </div>

      {/* Info Section */}
      <div className="p-6 flex flex-col justify-center">

        <p className="text-amber-600 font-bold uppercase tracking-widest text-sm">
          {product.brand}
        </p>

        <h1 className="text-3xl font-serif font-bold text-slate-900 mt-2">
          {product.name}
        </h1>

        <p className="text-gray-500 mt-4 leading-relaxed">
          {product.description}
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-6">
          Rs {product.price}
        </h2>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">

          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Add to Cart
          </button>

          <Link
            to="/shop"
            className="px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-100"
          >
            Back to Shop
          </Link>

        </div>

      </div>
    </div>

  </div>
)};

export default ProductDetail;