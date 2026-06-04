import { useState } from "react";
import axios from "axios";
import {
  PlusCircle,
  Image,
  DollarSign,
  Tag,
  FileText,
} from "lucide-react";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    category: "Men",
    countInStock: "",
  
  });

  const [imageFile, setImageFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleTextChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage({
      type: "",
      text: "",
    });

    if (!imageFile) {
      setMessage({
        type: "error",
        text: "Please select a perfume image!",
      });
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("brand", formData.brand);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("countInStock", formData.countInStock);
      data.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:8000/api/products",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage({
          type: "success",
          text: "Perfume successfully added!",
        });

        setFormData({
          name: "",
          brand: "",
          price: "",
          description: "",
          category: "Men",
          countInStock: "",
        });

        setImageFile(null);

        e.target.reset();
      }
    } catch (error) {
      console.error(error);

      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to add product. Check server connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-amber-500/10 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-extrabold tracking-wide text-slate-900">
            SCENTSATION <span className="text-amber-600">ADMIN</span>
          </h2>

          <p className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-widest">
            Add New Luxury Fragrance
          </p>
        </div>

        {/* Alert Message */}
        {message.text && (
          <div
            className={`p-4 mb-6 rounded-lg text-sm font-bold text-center ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-rose-50 text-rose-700 border border-rose-200"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-600" />
                Name
              </label>

              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleTextChange}
                placeholder="e.g. Dior Sauvage"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleTextChange}
                placeholder="e.g. Dior"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Price Category Stock */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-600" />
                Price
              </label>

              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleTextChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleTextChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Stock Count
              </label>

              <input
                type="number"
                name="countInStock"
                required
                value={formData.countInStock}
                onChange={handleTextChange}
                placeholder="50"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <Image className="w-4 h-4 text-amber-600" />
              Product Image
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              Description
            </label>

            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleTextChange}
              placeholder="Describe the fragrance..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition"
          >
            <PlusCircle className="w-5 h-5" />

            {loading
              ? "Uploading & Publishing..."
              : "Publish Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;