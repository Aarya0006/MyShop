import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom"; 
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import VendorDashboard from "./pages/VendorDashboard";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import "./App.css";


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};


const Footer = () => {
    return (
        <footer className="footer mt-auto py-3">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
                <div className="social-icons">
                    <a href="#" className="mx-2"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="mx-2"><i className="fab fa-twitter"></i></a>
                    <a href="#" className="mx-2"><i className="fab fa-instagram"></i></a>
                </div>
                <p>Designed with <i className="fas fa-heart text-danger"></i> by Aarya Singh Gautam </p>
            </div>
        </footer>
    );
};

export default function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
