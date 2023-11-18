import instance from "./config";

const getBooks = (search) => {
  if (search) {
    return instance.get(`product?search=${search}`);
  }
  return instance.get(`product`);
};
const getBook = (id) => {
  return instance.get(`product/${id}`);
};
const addBook = (Book) => {
  return instance.post(`products`, Book);
};
const updateBook = (Book) => {
  return instance.put(`products/${Book.id}`, Book);
};
const deleteBook = (id) => {
  return instance.delete(`products/${id}`);
};
export { getBooks, getBook, addBook, updateBook, deleteBook };
