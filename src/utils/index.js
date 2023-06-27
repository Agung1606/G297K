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

export function generateRandomUsername(name) {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${name}${randomNumber}`;
}

export function changeFormat(number) {
  // from chatGPT
  // if (number < 1000) {
  //   return number.toString();
  // } else if (number < 1000000) {
  //   const roundedNumber = Math.round(number / 1000);
  //   return `${roundedNumber}K`;
  // } else if (number < 1000000000) {
  //   const roundedNumber = Math.round(number / 1000000);
  //   return `${roundedNumber}M`;
  // } else {
  //   const roundedNumber = Math.round(number / 1000000000);
  //   return `${roundedNumber}B`;
  // }
  if(number < 1000) {
    return number.toString();
  } else if(number < 10000) {
    return number.toString().slice(0, 1) + "," + number.toString().slice(1);
  } else if(number < 100000) {
    return number.toString().slice(0, 2) + "." + number.toString().slice(2, 3) + "K";
  } else if (number < 1000000) {
    return number.toString().slice(0, 3) + "K"
  } else {
    const roundedNumber = Math.round(number / 1000000);
    return `${roundedNumber}JT`;
  }
}
