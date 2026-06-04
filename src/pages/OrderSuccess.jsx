import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">

      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Order Placed Successfully 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for shopping with us.
      </p>

      <Link
        to="/"
        className="bg-amber-600 text-white px-6 py-3 rounded-lg"
      >
        Continue Shopping
      </Link>

    </div>
  );
};

export default OrderSuccess;