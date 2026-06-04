import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
  } = useContext(CartContext);

  // Total Price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl bg-amber-100 mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Your Shopping Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">
          Your cart is empty
        </p>
      ) : (
        <>
          <div className="space-y-5">

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white shadow-sm p-4 rounded-xl"
              >

                {/* Image + Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div>
                    <h2 className="font-bold">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">
                      Rs {item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item._id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500"
                >
                  <Trash2 />
                </button>

              </div>
            ))}

          </div>

          {/* Bottom Section */}
          <div className="mt-10 flex justify-between items-center">

            <button
              onClick={clearCart}
              className="bg-amber-600 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>


            <div className="text-xl font-bold">
              Total: Rs {total}
            </div>
            <Link
      to="/checkout"
      className="bg-amber-600 text-white px-6 py-3 rounded-lg"
    >
      Checkout
    </Link>

          </div>
        </>
      )}

    </div>
  );
};

export default Cart;