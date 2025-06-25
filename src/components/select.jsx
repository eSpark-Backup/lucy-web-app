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
          ".MuiTypography-root": {
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
            <Typography sx={{ color: "#9e9e9e" }}>
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
          sx={{ width: "100%", div: { padding: 0, mt: "10px" } }}
        />
      )}
    </FormControl>
  );
};

export default CustomSelect;
