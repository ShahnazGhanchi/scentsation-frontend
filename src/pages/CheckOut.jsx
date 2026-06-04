import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/order-success");

    clearCart();
  };

  return (
    <div className="max-w-5xl bg-amber-100 mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow"
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            required
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 mb-4 rounded"
            rows="4"
            required
          />

          <button
            type="submit"
            className="w-full bg-amber-600 text-white py-3 rounded-lg"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between mb-3"
            >
              <span>
                {item.name} x {item.quantity}
              </span>

              <span>
                Rs {item.price * item.quantity}
              </span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span>Rs {total}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;