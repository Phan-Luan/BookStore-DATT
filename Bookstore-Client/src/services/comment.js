import instance from "./config";

const getComments = (id) => {
  return instance.get(`comments/${id}`);
};
const postComments = (data) => {
  return instance.post(`comments`, data);
};
export { getComments, postComments };
