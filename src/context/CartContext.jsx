import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('scentsation_cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('scentsation_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 1. Add Item to Cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const productId = product._id || product.id;
      const isExisting = prevItems.find(item => (item._id || item.id) === productId);
      
      if (isExisting) {
        return prevItems.map(item =>
          (item._id || item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }; 
      
  // 2. Remove Item from Cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => (item._id || item.id) !== id));
  };

  // 3. Update Quantity
  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        (item._id || item.id) === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // 4. Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Quantity Count
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};