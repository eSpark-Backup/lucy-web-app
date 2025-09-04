import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// export const isAuthenticated = () => {
//   const token = localStorage.getItem("token");
//   const email_verification = localStorage.getItem("email-verify");

//   return token && email_verification === "true";
// };

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const isEmailVerified = () => {
  return localStorage.getItem("email-verify") === "true";
};

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const saveEncryptedCredentials = (email, password) => {
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    SECRET_KEY
  ).toString();
  localStorage.setItem("rememberedEmail", email);
  localStorage.setItem("rememberedPassword", encryptedPassword);
};

export const getDecryptedCredentials = () => {
  const email = localStorage.getItem("rememberedEmail");
  const encryptedPassword = localStorage.getItem("rememberedPassword");
  if (!email || !encryptedPassword) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
    const password = bytes.toString(CryptoJS.enc.Utf8);
    return { email, password };
  } catch {
    return null;
  }
};

export const clearSavedCredentials = () => {
  localStorage.removeItem("rememberedEmail");
  localStorage.removeItem("rememberedPassword");
};
