import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";

const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  showOther = false,
  otherValue,
  onOtherChange,
}) => {
  return (
    <FormControl sx={{ width: "100%", mt: "17px" }}>
      <Typography fontSize={14} fontWeight={400} color="#2B106A" mb={1}>
        {label}
      </Typography>
      <Select
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "#F4F1FD",
          borderRadius: "10.66px",
          fontSize: "14px",
          fontWeight: 400,
          padding: "0px 20px",
          border: "1px solid #E2DBFA",

          "& .MuiSelect-select": {
            padding: 0,
            display: "flex",
            alignItems: "center",
            color: "#1A4FFF",
            fontSize: "14px",
            fontWeight: 400,
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },

          "& .MuiTypography-root": {
            fontSize: "14px",
            fontWeight: 400,
            color: "#1A4FFF7D",
          },
        }}
        MenuProps={{
          slotProps: {
            root: { hideBackdrop: true },
            backdrop: { invisible: true },
          },
        }}
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) =>
          selected === "" ? (
            <Typography
              sx={{
                color: "#9e9e9e",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Select an option (option)
            </Typography>
          ) : (
            selected
          )
        }
      >
        {options?.map((item, index) => (
          <MenuItem value={item?.value} key={index}>
            {item?.label}
          </MenuItem>
        ))}
      </Select>
      {showOther && value === "Other (please specify)" && (
        <TextField
          value={otherValue}
          onChange={onOtherChange}
          placeholder="Please Specify"
          sx={{
            width: { xs: "100%" },
            mt: "15px",
            "& .MuiOutlinedInput-root": {
              border: "1px solid #E2DBFA",
              borderRadius: "10.66px",
              padding: "0px 20px",
              backgroundColor: "#F4F1FD",
              height: "50px",
              outline: "none",
              opacity: 1,

              "&:hover fieldset": {
                border: "none",
              },
              "&.Mui-focused fieldset": {
                border: "none",
              },
              "& fieldset": {
                border: 0,
              },
            },

            // Style the input element
            "& .MuiOutlinedInput-input": {
              padding: 0,
              height: "100%",
              fontSize: "14px",
              fontFamily: "Nunito Sans",
              fontWeight: 400,
              color: "#1A4FFF",

              "&::placeholder": {
                color: "#1A4FFF",
                fontWeight: 400,
                fontSize: "14px",
                opacity: 1,
              },

              "&:-webkit-autofill": {
                WebkitBoxShadow: "0 0 0 1000px #F4F1FD inset !important",
                WebkitTextFillColor: "#1A4FFF",
                transition: "background-color 5000s ease-in-out 0s",
                fontSize: "14px",
              },
            },
          }}
        />
      )}
    </FormControl>
  );
};

export default CustomSelect;
