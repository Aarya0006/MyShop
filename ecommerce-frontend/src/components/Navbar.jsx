// src/components/Navbar.jsx

import React, { useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation(); // To check current path for active class

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid container">
        <Link className="navbar-brand" to="/">
          MyShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="btn btn-primary" to="/products">
                Products 
              </Link>
            </li>
            <li className="nav-item me-2">
              <Link className="btn btn-primary" to="/cart">
                Cart <span className="badge text-bg-secondary">{cartItemCount}</span>
              </Link>
            </li>
            {user ? (
               <>
               <li className="nav-item">
                <NavLink className="btn btn-primary position-relative" to="/dashboard">
                  My Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                  <button className="btn btn-primary position-relative" onClick={ handleLogout }>
                    Logout ({ user.username })
                  </button>
             </li>
             </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`btn btn-primary${location.pathname === '/login' ? 'active' : ''}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`btn btn-primary ${location.pathname === '/signup' ? 'active' : ''}`}
                    to="/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}