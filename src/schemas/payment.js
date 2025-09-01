import { useMemo } from "react";
import * as Yup from "yup";

/** Luhn algorithm check */
const luhnCheck = (num) => {
  if (!/^\d+$/.test(num)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let digit = parseInt(num.charAt(i), 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

/** Expiry parser (MM/YY or MM/YYYY) */
const parseExpiry = (value) => {
  if (!value) return null;
  const match = value.match(/^(\d{1,2})[\/\-](\d{2}|\d{4})$/);
  if (!match) return null;
  let month = parseInt(match[1], 10);
  let year = parseInt(match[2], 10);
  if (String(year).length === 2) year += 2000;
  if (month < 1 || month > 12) return null;
  return new Date(year, month, 0, 23, 59, 59, 999); // last day of month
};

/** Month name array for "May 2028" style */
const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

/** Hook to get schema */
export const useValidationSchema = (method) => {
  return useMemo(() => {
    return Yup.object({
      holder_name: Yup.string()
        .trim()
        .min(2, "Holder name is too short")
        .required("Holder name is required"),

      card_number: Yup.string()
        .transform((v) => (v ? v.replace(/\s+/g, "") : v)) // remove spaces
        .matches(/^\d{12,19}$/, "Card number must be 12–19 digits")
        .test(
          "luhn",
          "Card number is invalid",
          (val) => !!val && luhnCheck(val)
        )
        .required("Card number is required"),

      expires: Yup.string()
        .required("Expiry date is required")
        .matches(/^\d{4}-(0[1-9]|1[0-2])$/, "Invalid expiry format") // YYYY-MM
        .test("not-expired", "Card is expired", (value) => {
          if (!value) return false;
          const [year, month] = value.split("-").map(Number);
          const today = new Date();
          const currentYear = today.getFullYear();
          const currentMonth = today.getMonth() + 1; // 0-based → +1

          // Expired agar year chhota ho OR same year but month chhota ho
          if (year < currentYear) return false;
          if (year === currentYear && month < currentMonth) return false;

          return true;
        }),

      cvv: Yup.string()
        .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
        .required("CVV is required"),

      country: Yup.string()
        .trim()
        .min(2, "Country is required")
        .required("Country is required"),

      zip_code: Yup.string()
        .trim()
        .matches(/^[A-Za-z0-9\- ]{3,10}$/, "ZIP Code must be 3–10 characters")
        .required("ZIP Code is required"),
    });
  }, [method]);
};
