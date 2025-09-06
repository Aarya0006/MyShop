import React from "react";

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="card h-100 product-car">
      <img
        src={product.image || "/placeholder.png"}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">₹{product.price}</p>
        <button
          className="btn btn-success mt-auto"
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
