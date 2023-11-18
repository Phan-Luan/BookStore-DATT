import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  name: Yup.string().required("Tên là trường bắt buộc"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là trường bắt buộc"),
  password: Yup.string()
    .min(8, "Mật khẩu phải ít nhất 8 ký tự")
    .required("Mật khẩu là trường bắt buộc"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp")
    .required("Xác nhận mật khẩu là trường bắt buộc"),
});
export { registerSchema };
