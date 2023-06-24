import * as yup from "yup";

export const emailValidation = yup.object().shape({
  email: yup
    .string()
    .email("Tolong masukan email dengan benar")
    .required("Email address di butuhkan"),
});

export const passwordValidation = yup.object().shape({
  password: yup
    .string()
    .required("Password dibutuhkan")
    .min(6, ({ min }) => `Kata sandi harus setidaknya ${min} karakter`),
});
