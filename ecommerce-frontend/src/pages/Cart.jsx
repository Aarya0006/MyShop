// src/pages/Cart.jsx

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  // This is a "defensive" check. If the cart isn't an array yet,
  // it shows a loading message instead of crashing.
  if (!Array.isArray(cart)) {
    return <p className="text-center">Loading cart...</p>;
  }

  const total = cart.reduce((s, ci) => s + ci.quantity * (ci.item?.price || 0), 0);

  return (
    <div className="cart-container">
      <h3 className="page-title">Your Shopping Cart</h3>
      
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="empty-cart-message">Your cart is currently empty.</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          {cart.map((ci) => (
            <div key={ci.id} className="cart-item">
              <img
                src={ci.item?.image || "https://placehold.co/150"}
                alt={ci.item?.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h6>{ci.item?.name}</h6>
                <p className="mb-0 text-muted">
                  Price: ₹{ci.item?.price} | Quantity: {ci.quantity}
                </p>
              </div>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(ci.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            Total: ₹{total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}