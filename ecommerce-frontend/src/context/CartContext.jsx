import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { getCart, addToCart as addApi, removeFromCart as removeApi } from "../services/cartServices";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await getCart();
          setCart(res.data);
        } catch (err) {
          console.error("fetch cart failed", err);
          setCart([]);
        }
      })();
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (itemId, quantity = 1) => {
    try {
      const res = await addApi({ item: itemId, quantity });
      // backend might return updated cart or added cart item
      // assume backend returns full cart
      if (res.data?.length) setCart(res.data);
      else setCart((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("add to cart failed", err);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await removeApi(cartItemId);
      setCart((prev) => prev.filter((ci) => ci.id !== cartItemId));
    } catch (err) {
      console.error("remove from cart failed", err);
    }
  };

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
}
