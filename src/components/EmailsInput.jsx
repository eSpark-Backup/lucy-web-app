import { useState } from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
export default function EmailsInput({
  name,
  emails,
  setEmails,
  placeholder,
  formik,
  data,
}) {
  const [inputValue, setInputValue] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddEmail = (val) => {
    const email = val.trim();
    if (isValidEmail(email) && !emails.includes(email)) {
      setEmails((prev) => [...prev, email]);
    }
  };

  return (
    <Autocomplete
      multiple
      freeSolo
      options={data}
      value={emails}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, newValue) => {
        // Check if the last added is a valid email
        const lastValue = newValue[newValue.length - 1];
        if (typeof lastValue === "string" && isValidEmail(lastValue)) {
          const unique = [...new Set(newValue)];
          setEmails(unique);
          formik.setFieldValue("recipients", unique);
        } else if (typeof lastValue !== "string") {
          // It was selected from dropdown (not typed)
          setEmails(newValue);
        }
        setInputValue("");
      }}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              variant="outlined"
              label={option}
              {...tagProps}
              sx={{
                height: "36px",
                backgroundColor: "rgba(217, 217, 217, 1)",
                borderRadius: "5.75px",
                color: "#000000",
                border: "none",
                fontSize: "12px",
                fontWeight: 400,
                fontFamily: "Nunito Sans",
              }}
            />
          );
        })
      }
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          variant="outlined"
          placeholder={placeholder}
          sx={{
            borderRadius: "4px",
            backgroundColor: "#F5F6FA",
            "& .MuiInputBase-input": {
              fontSize: "14px",
              fontFamily: "Nunito Sans",
              fontWeight: 400,
              "&::placeholder": {
                color: "#A6A6A6",
                fontSize: "14px",
                fontFamily: "Nunito Sans",
                fontWeight: 400,
                opacity: 1,
              },
            },
          }}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === "Tab") && inputValue) {
              e.preventDefault();
              handleAddEmail(inputValue);
              setInputValue("");
            }
          }}
        />
      )}
    />
  );
}
