import React, { useState, useEffect, useContext } from "react";
import { getItems } from "../services/itemServices";
import ProductCard from "../components/ProductCart.jsx";
import { CartContext } from "../context/CartContext";

export default function Products() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { addToCart } = useContext(CartContext);

  const fetchItems = async () => {
    try {
      const params = {};
      if (category) params.category = category;
      if (maxPrice) params.price_lte = maxPrice;
      const res = await getItems(params);
      setItems(res.data);
    } catch (err) {
      console.error("Failed to fetch items", err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>Products</h3>

     <div className="filter-bar row mb-3 align-items-center">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Search by category..."
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <input
            type="number"
            className="form-control"
            placeholder="Enter max price..."
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-grid">
          <button className="btn btn-primary" onClick={fetchItems}>
            Apply
          </button>
        </div>
      </div>
      <div className="row">
        {items.length === 0 && <div className="col-12">No items found.</div>}
        {items.map((item) => (
          <div className="col-md-4 mb-3" key={item.id}>
            <ProductCard product={item} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </>
  );
}
