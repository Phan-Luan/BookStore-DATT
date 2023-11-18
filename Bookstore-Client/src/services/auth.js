import instance from "./config";
const login = (data) => {
  return instance.post("login", data);
};
const register = (data) => {
  return instance.post("register", data);
};

const loginGoogle = (data) => {
  return instance.post("login/google", data);
};
export { login, register, loginGoogle };
