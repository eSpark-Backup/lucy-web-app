import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useMemo } from "react";
import { Formik, Form } from "formik";
import Visa from "../../assets/icons/visa.svg";
import Paypal from "../../assets/icons/paypal.svg";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { PAYMENT_METHOD_DATA } from "../../constant";
import { componentStyles } from "../../style/componentStyles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCreatePaymentMutation } from "../../services/payment";
import NotFound from "../NotFound";
import { useValidationSchema } from "../../schemas/payment";

const PaymentMethod = () => {
  const [billingYearly, setBillingYearly] = useState(false);
  const [method, setMethod] = useState("card");
  const { paymentSection, planSection } = PAYMENT_METHOD_DATA || {};
  const { yearBillingText, paymentText, paymentDescription, paymentOptions } =
    paymentSection || {};
  const { planSummary, stepperData, amountSummary } = planSection || {};
  const { paymentMethodScreenStyles } = componentStyles || {};
  const { mainBoxStyle, paymentSectionStyle, planSectionStyle } =
    paymentMethodScreenStyles || {};
  const navigate = useNavigate();
  const [createPayment, { isLoading: createLoading }] =
    useCreatePaymentMutation();
  const [searchParams] = useSearchParams();
  const raw = searchParams.get("session_id");
  const session_id = raw?.replace(/[$"{}]/g, "");

  const initialValues = useMemo(() => {
    let values = { method };
    const currentOption = paymentOptions?.find((opt) => opt?.value === method);
    currentOption?.form?.forEach((field) => {
      if (field?.isRow) {
        field?.fields?.forEach((f) => (values[f?.name] = ""));
      } else {
        values[field?.name] = "";
      }
    });
    return values;
  }, [method]);

  const validationSchema = useValidationSchema(method);

  const PaymentSection = ({
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
  }) => {
    return (
      <Box sx={paymentSectionStyle?.paymentBoxStyle}>
        <Box sx={{ width: "100%" }}>
          <Stack direction={"row"} sx={paymentSectionStyle?.billingBoxStyle}>
            <Typography sx={paymentSectionStyle?.billingTextStyle}>
              {yearBillingText}
            </Typography>
            <Switch
              checked={billingYearly}
              onChange={() => setBillingYearly((s) => !s)}
              sx={paymentSectionStyle?.switchStyle}
            />
          </Stack>
          <Stack spacing={1.2} pt={2.5}>
            <Typography sx={paymentSectionStyle?.paymentTextStyle} variant="h3">
              {paymentText}
            </Typography>
            <Typography
              sx={paymentSectionStyle?.paymentDescriptionStyle}
              variant="h6"
            >
              {paymentDescription}
            </Typography>
            <RadioGroup
              value={method}
              onChange={(e) => {
                setMethod(e.target.value);
              }}
            >
              {paymentOptions.map((item, key) => (
                <Stack
                  key={key}
                  spacing={1}
                  mb={2}
                  sx={paymentSectionStyle?.paymentMethodBoxStyle(method, item)}
                >
                  <Stack
                    mt={1.5}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      value={item.value}
                      control={<Radio sx={paymentSectionStyle?.radioStyle} />}
                      label={
                        <Typography sx={paymentSectionStyle?.radioLabelStyle}>
                          {item?.title}
                        </Typography>
                      }
                    />
                    {item.value === "card" && (
                      <Box
                        component="img"
                        src={Visa}
                        sx={{ width: { xs: 45, lg: 65 } }}
                      />
                    )}
                    {item.value === "paypal" && (
                      <Box
                        component="img"
                        src={Paypal}
                        sx={{ width: { xs: 45, lg: 65 } }}
                      />
                    )}
                  </Stack>
                  {method === item.value && (
                    <Stack spacing={2} mt={1} width={"100%"} p={1.5}>
                      {item.form.map((field, idx) =>
                        field.isRow ? (
                          <Stack
                            direction={{ xs: "column", lg: "row" }}
                            spacing={2}
                            key={idx}
                          >
                            {field.fields.map((f, subIdx) => (
                              <Stack spacing={1} width="100%" key={subIdx}>
                                <Typography
                                  variant="h6"
                                  sx={{ fontWeight: 500 }}
                                >
                                  {f.label}
                                </Typography>
                                <TextField
                                  fullWidth
                                  placeholder={f.placeholder}
                                  name={f.name}
                                  type={f.type}
                                  value={values[f.name] || ""}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched[f.name] && Boolean(errors[f.name])
                                  }
                                  helperText={touched[f.name] && errors[f.name]}
                                  sx={paymentSectionStyle?.inputStyle}
                                  InputProps={{
                                    inputProps: { min: 0 },
                                  }}
                                />
                              </Stack>
                            ))}
                          </Stack>
                        ) : (
                          <Stack spacing={1} key={idx}>
                            <Typography sx={{ fontWeight: 500 }}>
                              {field.label}
                            </Typography>
                            <TextField
                              fullWidth
                              placeholder={field.placeholder}
                              name={field.name}
                              type={field.type}
                              value={values[field.name] || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched[field.name] &&
                                Boolean(errors[field.name])
                              }
                              helperText={
                                touched[field.name] && errors[field.name]
                              }
                              sx={paymentSectionStyle?.inputStyle}
                              InputProps={{
                                inputProps: { min: 0 },
                              }}
                            />
                          </Stack>
                        )
                      )}
                    </Stack>
                  )}
                </Stack>
              ))}
            </RadioGroup>
          </Stack>
        </Box>
      </Box>
    );
  };

  const PlanSection = () => {
    const QontoStepIcon = (props) => {
      const { active, completed, className } = props;
      return (
        <Box
          className={className}
          sx={planSectionStyle?.qontoStepIconStyle(active, completed)}
        />
      );
    };

    return (
      <Box sx={planSectionStyle?.containerBoxStyle}>
        <Box sx={planSectionStyle?.planBoxStyle}>
          <Stack width={"100%"} spacing={1.5}>
            <Stack direction={"row"} sx={planSectionStyle?.planSummaryStyle}>
              <Typography variant="h4">{planSummary?.title}</Typography>
              {/* <Typography variant="h4">{planSummary?.price}</Typography> */}
            </Stack>
            <Stack direction={"row"} sx={planSectionStyle?.billingCycleStyle}>
              <Typography variant="h5" color="#979797" fontWeight={500}>
                {planSummary?.billingCycle}
              </Typography>
              <Typography variant="h5" color="#979797" fontWeight={500}>
                {planSummary?.offer}
              </Typography>
            </Stack>
          </Stack>
          <Box
            component={"hr"}
            border={"1px solid rgba(151, 151, 151, 0.1)"}
            my={3.5}
          />
          <Stack>
            {/* <Stepper orientation="vertical" activeStep={2}>
              {stepperData.map((step, index) => (
                <Step key={index} active>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    sx={{
                      py: 0,
                      "& .MuiStepLabel-iconContainer": { pr: 2.5 },
                    }}
                  >
                    <Stack
                      direction={"row"}
                      sx={planSectionStyle?.steperLableStyle}
                    >
                      <Typography fontWeight={600}>{step.date}</Typography>
                      <Typography fontWeight={600}>{step.price}</Typography>
                    </Stack>
                  </StepLabel>
                  <StepContent>
                    <Stack
                      direction={"row"}
                      sx={planSectionStyle?.stepContentStyle}
                    >
                      <Typography variant="h6" fontWeight={500} color="#979797">
                        {step.title}
                      </Typography>
                      <Typography variant="h6" fontWeight={500} color="#979797">
                        {step.period}
                      </Typography>
                    </Stack>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <Box
              component={"hr"}
              border={"1px solid rgba(151, 151, 151, 0.1)"}
              my={3.5}
            /> */}
            {/* <Stack sx={{ pr: 1 }}>
              <Typography fontWeight={600}>{amountSummary.title}</Typography>
            </Stack>
            <Stack direction={"row"} sx={planSectionStyle?.accountSummaryStyle}>
              <Typography variant="h6" fontWeight={500} color="#979797">
                {amountSummary.date}
              </Typography>
              <Typography variant="h6" fontWeight={500} color="#979797">
                {amountSummary.text}
              </Typography>
            </Stack> */}
            <Stack my={2}>
              <Button
                type="submit"
                fullWidth
                sx={planSectionStyle?.buttonStyle}
              >
                <Typography variant="h5" sx={planSectionStyle?.buttonTypoStyle}>
                  {amountSummary?.buttonText}
                </Typography>
              </Button>
            </Stack>
            <Typography variant="h6" fontWeight={500} color="#979797">
              {amountSummary.subText}
            </Typography>
          </Stack>
        </Box>
      </Box>
    );
  };

  if (!session_id) {
    return <NotFound />;
  }

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        if (!session_id) {
          toast.error("Session ID is missing!");
          return;
        }

        const ObjToSend = {
          session_id: session_id,
        };

        createPayment(ObjToSend).then((res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message || "Something went wrong!");
            return;
          }
          if (res?.data) {
            toast.success(res?.data?.message || "Session created successfully");
            resetForm();
            navigate("/dashboard");
          }
        });
      }}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <Form>
          <Box sx={paymentSectionStyle?.containerBoxStyle}>
            <Box sx={mainBoxStyle}>
              {/* payment section */}
              <PaymentSection
                handleChange={handleChange}
                handleBlur={handleBlur}
                values={values}
                errors={errors}
                touched={touched}
              />
              {/* plan section */}
              <PlanSection />
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default PaymentMethod;
