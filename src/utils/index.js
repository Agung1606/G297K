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
  if (number !== undefined) {
    if (number < 1000) {
      return number.toString();
    } else if (number < 10000) {
      return number.toString().slice(0, 1) + "," + number.toString().slice(1);
    } else if (number < 100000) {
      return (
        number.toString().slice(0, 2) +
        "." +
        number.toString().slice(2, 3) +
        "RB"
      );
    } else if (number < 1000000) {
      return number.toString().slice(0, 3) + "RB";
    } else if (number < 10000000) {
      return (
        number.toString().slice(0, 1) +
        "." +
        number.toString().slice(1, 2) +
        "JT"
      );
    } else if (number < 100000000) {
      return (
        number.toString().slice(0, 2) +
        "." +
        number.toString().slice(2, 3) +
        "JT"
      );
    } else {
      return number.toString().slice(0, 3) + "JT";
    }
  }
}

export function formatRelativeTime(dateInput) {
  const date = new Date(dateInput);
  const now = new Date();
  const diff = Math.abs(now - date);
  const seconds = Math.floor(diff / 1000);
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  if (seconds < 60) {
    return `${seconds} detik`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} menit`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} jam`;
  }

  const days = Math.floor(hours / 24);
  if (days <= 7) {
    return `${days} hari`;
  }

  if (days > 7) {
    return `${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()}`;
  }
}
