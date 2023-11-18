import instance from "./config";

const getCarts = (user_id) => {
  return instance.get(`cart-client/${user_id}`);
};

const addCart = (Cart) => {
  return instance.post(`addtocart`, Cart);
};

const updateCart = (Cart, id) => {
  return instance.put(`update-cart/${id}`, Cart);
};

const deleteCart = (id) => {
  return instance.delete(`delete-cart/${id}`);
};

const deleteCartUesr = (user_id) => {
  return instance.delete(`delete-cart-user/${user_id}`);
};
const placeOrder = (data) => {
  return instance.post(`place-order`, data);
};
const myorder = (user_id) => {
  return instance.get(`list-order/${user_id}`);
};
const getOrderDetail = (order_id) => {
  return instance.get(`list-cart-order/${order_id}`);
};
export {
  getCarts,
  addCart,
  deleteCart,
  updateCart,
  deleteCartUesr,
  placeOrder,
  myorder,
  getOrderDetail,
};
