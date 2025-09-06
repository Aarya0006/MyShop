// src/pages/VendorDashboard.jsx

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem, getMyItems, deleteItem } from '../services/itemServices';
import { AuthContext } from '../context/AuthContext';

// This is the "Add Product" form, extracted into its own component
const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const newItemData = { name, description, price, category, image };
      const response = await createItem(newItemData);
      alert('Product added successfully!');
      onProductAdded(response.data); // Pass new product up to the parent
      // Clear form
      setName(''); setDescription(''); setPrice(''); setCategory(''); setImage('');
    } catch (err) {
      console.error('Failed to create item:', err);
      setError('Failed to add product. Please check the details and try again.');
    }
  };

  return (
    <div className="form-container mb-5">
      <h3 className="page-title">Add a New Product</h3>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="price" className="form-label">Price (₹)</label>
            <input type="number" step="0.01" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input type="url" className="form-control" id="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://example.com/image.png" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Product</button>
      </form>
    </div>
  );
};

// This is the main dashboard component
export default function VendorDashboard() {
  const { user } = useContext(AuthContext);
  const [myItems, setMyItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMyItems(user.id)
        .then(response => {
          setMyItems(response.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error("Failed to fetch vendor items", error);
          setIsLoading(false);
        });
    }
  }, [user]);

  const handleProductAdded = (newProduct) => {
    setMyItems(prevItems => [newProduct, ...prevItems]);
  };

  const handleDelete = async (itemId) => {
    // Ask for confirmation before deleting
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteItem(itemId);
        // Remove the item from the local state to update the UI instantly
        setMyItems(prevItems => prevItems.filter(item => item.id !== itemId));
        alert('Product deleted successfully.');
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('Failed to delete product.');
      }
    }
  };

  if (isLoading) {
    return <p>Loading your dashboard...</p>;
  }

  return (
    <div>
      <AddProductForm onProductAdded={handleProductAdded} />

      <div className="mt-5">
        <h3 className="page-title">Your Listed Products</h3>
        <div className="list-group">
          {myItems.length > 0 ? (
            myItems.map(item => (
              <div key={item.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <p className="mb-1 text-muted">₹{item.price}</p>
                </div>
                <div>
                  <button className="btn btn-secondary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>You have not listed any products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}