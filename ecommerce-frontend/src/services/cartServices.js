import api from "./api";

export const getCart = () => api.get("/cart/");
export const addToCart = (payload) => api.post("/cart/", payload);
export const removeFromCart = (id) => api.delete(`/cart/remove/${id}/`);
