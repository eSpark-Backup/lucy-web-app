import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Button, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import cardImage from "../assets/images/choose-your-path.svg";
import edit from "../assets/icons/edit.svg";
import view from "../assets/icons/view.svg";
import bin from "../assets/icons/bin.svg";

import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from "@mui/icons-material/Cancel";
import { useCancelSubscriptionMutation } from "../services/payment";
import { toast } from "react-toastify";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

export default function RecipeReviewCard({
  school = {},
  handleOpenDeleteModal = () => {},
}) {
  const [cancelSubscription, { isLoading }] = useCancelSubscriptionMutation();
  const navigate = useNavigate();

  /* ---------------- Subscription Logic ---------------- */

  const endDate = school?.subscription_end;
  const subscriptionStatus = school?.organization?.subscription_status;

  const isValidDate = endDate && dayjs(endDate).isValid();
  const isExpired = isValidDate && dayjs(endDate).isBefore(dayjs());

  let statusText = "Active";
  let statusColor = "#4caf50";
  let StatusIcon = CheckCircleIcon;
  let dateLabel = "Renews on:";

  if (subscriptionStatus === "canceling" && !isExpired) {
    statusText = "Cancelling";
    statusColor = "#4880ff";
    dateLabel = "cancelling on:";
    StatusIcon = CancelIcon;
  }

  if (subscriptionStatus === "canceling" && !school?.is_paid) {
    statusText = "Pending";
    statusColor = "#9e9e9e";
    dateLabel = "cancelling on:";
    StatusIcon = PendingIcon;
  }

  if (isExpired) {
    statusText = "Expired";
    statusColor = "#f44336";
    StatusIcon = CancelIcon;
    dateLabel = "Expired on:";
  }

  if (subscriptionStatus === "cancelled" && isExpired) {
    statusText = "Expired";
    statusColor = "#9e9e9e";
    StatusIcon = CancelIcon;
    dateLabel = "Expired on:";
  }

  const handleCancelPayment = async () => {
    try {
      const res = await cancelSubscription({
        body: {
          organizationId: school?.organization?.id,
        },
      }).unwrap();

      toast.success(res?.message || "Subscription canceled successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Cancel failed!");
      console.error(err);
    }
  };

  /* ---------------------------------------------------- */

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: { xs: "100%", sm: 325 },
        backgroundColor: "rgba(255, 255, 255, 0.48)",
        boxShadow: "5px 5px 45px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "11.88px",
      }}
    >
      {/* ---------------- Header ---------------- */}
      <CardHeader
        title={
          school?.name
            ? school.name.split(" ").slice(0, 2).join(" ") +
              (school.name.split(" ").length > 2 ? "..." : "")
            : "No Name"
        }
        subheader={
          school?.created_at
            ? dayjs(school.created_at).tz(dayjs.tz.guess()).format("L LT")
            : ""
        }
        titleTypographyProps={{
          variant: "h5",
          sx: {
            color: "#202224",
            opacity: 0.9,
            fontWeight: 500,
            fontFamily: "Poppins",
            mb: 1,
            pr: 1.5,
          },
        }}
        subheaderTypographyProps={{
          variant: "body2",
          sx: { fontFamily: "Poppins" },
        }}
        action={
          <Box
            sx={{
              bgcolor: school?.is_paid ? "#4caf50" : "#f44336",
              color: "white",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              fontSize: "0.75rem",
              fontWeight: 600,
              fontFamily: "Poppins",
              textTransform: "uppercase",
            }}
          >
            {school?.is_paid ? "Paid" : "Unpaid"}
          </Box>
        }
      />

      {/* ---------------- Image ---------------- */}
      <CardMedia
        component="img"
        height="194"
        image={school?.image || cardImage}
        alt={school?.name}
      />

      {/* ---------------- Subscription Section ---------------- */}
      <Stack spacing={1} p={2} pb={0}>
        <Stack direction="row" alignItems="center" spacing={0.8}>
          <StatusIcon fontSize="medium" sx={{ color: statusColor }} />
          <Typography
            variant="h5"
            sx={{ color: statusColor }}
            letterSpacing={0.5}
          >
            {statusText}
          </Typography>
        </Stack>

        <Typography
          fontWeight={500}
          sx={{ fontSize: "13px", color: "#808183", letterSpacing: 0.5 }}
        >
          {dateLabel}{" "}
          <Typography
            component="span"
            fontWeight={600}
            sx={{ fontSize: "14px", color: "#202224", opacity: "85%" }}
          >
            {isValidDate ? dayjs(endDate).format("MMMM DD, YYYY") : "--"}
          </Typography>
        </Typography>

        {subscriptionStatus === "active" && !isExpired && (
          <Stack py={1}>
            <Button
              color="primary"
              loading={isLoading}
              disabled={school?.email === "lucyhood79@gmail.com"}
              onClick={handleCancelPayment}
              sx={{
                p: 2.3,
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: 0.8,
                color: "#fff",
                borderRadius: "8px",
                backgroundColor: "#4880FF",
                "&:hover": {
                  backgroundColor: "#3a6edc",
                },
                "&.Mui-disabled": {
                  color: "#fff",
                  backgroundColor: "#999",
                },
              }}
            >
              {isLoading ? "" : "Cancel Subscription"}
            </Button>
          </Stack>
        )}

        <Divider />
      </Stack>

      {/* ---------------- Description ---------------- */}
      <CardContent>
        <Typography
          variant="body1"
          sx={{
            color: "#202224",
            opacity: "60%",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {school?.description || "--"}
        </Typography>
      </CardContent>

      {/* ---------------- Actions ---------------- */}
      <CardActions disableSpacing>
        {school?.email !== "lucyhood79@gmail.com" && (
          <IconButton disableRipple onClick={handleOpenDeleteModal}>
            <Box component="img" src={bin} sx={{ width: "60%" }} />
          </IconButton>
        )}

        <IconButton
          disableRipple
          onClick={() =>
            navigate(`/dashboard/school-overview/preview/${school?.id}`)
          }
        >
          <Box component="img" src={view} />
        </IconButton>

        <IconButton
          disableRipple
          onClick={() =>
            navigate(`/dashboard/school-overview/edit/${school?.id}`)
          }
        >
          <Box component="img" src={edit} />
        </IconButton>
      </CardActions>
    </Card>
  );
}
