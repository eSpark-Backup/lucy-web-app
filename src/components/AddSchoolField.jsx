import { Box, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const AddSchoolField = ({
  formik,
  name,
  min = 0,
  max = 100,
  step = 1,
  inputStyle,
}) => {
  const value = formik.values[name] ?? 0;

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    formik.setFieldValue(name, newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    formik.setFieldValue(name, newValue);
  };

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue >= min && newValue <= max) {
        formik.setFieldValue(name, newValue);
      }
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton
          onClick={handleDecrement}
          sx={{
            width: { xs: "46px", md: "54px", lg: "56px" },
            height: { xs: "46px", md: "54px", lg: "56px" },
            border: "1px solid #D8D8D8",
            backgroundColor: "#F1F4F9",
            borderRadius: "8px",
            fontSize: "18px",
            color: "#000",
          }}
        >
          <RemoveIcon />
        </IconButton>

        <TextField
          fullWidth
          type="number"
          name={name}
          value={value || 0}
          onChange={handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[name] && Boolean(formik.errors[name])}
          sx={inputStyle}
          inputProps={{
            min: min,
            max: max,
            style: { textAlign: "center" },
          }}
        />

        <IconButton
          onClick={handleIncrement}
          sx={{
            width: { xs: "46px", md: "54px", lg: "56px" },
            height: { xs: "46px", md: "54px", lg: "56px" },
            border: "1px solid #D8D8D8",
            backgroundColor: "#F1F4F9",
            borderRadius: "8px",
            fontSize: "18px",
            color: "#000",
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      {formik.touched[name] && formik.errors[name] && (
        <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
          {formik.errors[name]}
        </Typography>
      )}
    </Box>
  );
};

export default AddSchoolField;
