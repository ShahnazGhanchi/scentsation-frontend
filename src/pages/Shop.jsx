import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx';
import { Link } from "react-router-dom";

// Fallback Dummy Data (Agar backend down ho ya empty ho to ye show hoga)
const dummyProducts = [
  {
    _id: "d1",
    name: "Royal Oud Luxury",
    category: "Men",
    price: 120,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=500&q=80",
    description: "Deep woody and premium oriental scent."
  },
  {
    _id: "d2",
    name: "Rose Élysée",
    category: "Women",
    price: 95,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80",
    description: "Fresh blooming french roses and vanilla."
  },
  {
    _id: "d3",
    name: "Oceanic Breeze",
    category: "Unisex",
    price: 85,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=500&q=80",
    description: "Crisp sea salt combined with citrus notes."
  }
];

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // FIXED: URL se `/${id}` hata diya hai taake saare products load hon
        const response = await axios.get('https://scentsation-backend-orpin.vercel.app/api/products');
        
        if (response.data && response.data.length > 0) {
          setProducts(response.data);
        } else {
          // if database empty, use dummy data
          console.log("Database empty hai, dummy products loading...");
          setProducts(dummyProducts);
        }
        setLoading(false);
      } catch (err) {
        console.log("Backend se connect nahi ho saka, using dummy products fallback.", err);
        // Agar backend chal hi nahi raha, tab bhi project chalta rahe
        setProducts(dummyProducts);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtering & Sorting Logic
  const filteredProducts = products
    .filter(product => {
      if (!product || !product.category) return false;
      return category === 'All' ? true : product.category.toLowerCase() === category.toLowerCase();
    })
    .sort((a, b) => {
      if (sortBy === 'low-to-high') return a.price - b.price;
      if (sortBy === 'high-to-low') return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="text-center py-20 text-xl font-medium text-amber-600">Premium collection load ho rahi hai... ✨</div>;

  return (
    <div className="max-w-7xl bg-amber-100 mx-auto px-6 sm:px-8 lg:px-12 py-10">
      
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-slate-900 tracking-wide font-black">THE FRAGRANCE LOUNGE</h1>
        <p className="text-gray-500 mt-2 font-medium">Discover your signature scent from our exclusive catalog</p>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-10">
        <div className="flex gap-3">
          {['All', 'Men', 'Women', 'Unisex'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-200 ${
                category === cat 
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20' 
                  : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm font-bold text-slate-500 whitespace-nowrap">Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-sm font-bold rounded-lg focus:ring-amber-500 focus:border-amber-500 block w-full sm:w-48 p-2.5 text-slate-700"
          >
            <option value="none">Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Real Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-medium">Is category mein koi products nahi hain.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Shop;