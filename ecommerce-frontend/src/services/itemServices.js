import api from "./api";

export const getItems = (params) => api.get("/items/", { params });
export const getItem = (id) => api.get(`/items/${id}/`);
export const createItem = (itemData) => api.post("/items/", itemData);
export const deleteItem = (id) => api.delete(`/items/${id}/`);
export const getMyItems = () => api.get("/items/?my_items=true");