import AuthLayout from "../components/Layouts/AuthLayout";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Forgot from "../components/auth/Forget";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import Dashboard from "../components/dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import Calendar from "../components/dashboard/Calendar";
import About from "../components/dashboard/About";
import NotFound from "../components/NotFound";
import Profile from "../components/dashboard/Profile";
import SubscriptionCard from "../components/dashboard/Subscription";
import CreateContent from "../components/dashboard/CreateContent";
import EventList from "../components/dashboard/EventList";
import EventContents from "../components/dashboard/EventContents";
import { Navigate } from "react-router-dom";
import ResetPassword from "../components/auth/ResetPassword";
import EmailVerification from "../components/auth/EmailVerification";
import VerifyEmail from "../components/auth/VerifyEmail";
import CreateEvent from "../components/dashboard/CreateEvent";
import Subplan from "../components/auth/Subplan";
import SchoolOverview from "../components/dashboard/SchoolOverview";
import SchoolFormSubmission from "../components/SchoolFormSubmission";
import PrivateRoute from "./PrivateRoute";
import CheckoutResult from "../components/dashboard/CheckoutResult";
import TrustProtectedRoute from "./TrustProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/sub-plan",
    element: <Subplan />,
  },
  {
    path: "/success",
    element: <CheckoutResult status="success" />,
  },
  {
    path: "/cancel",
    element: <CheckoutResult status="cancel" />,
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/auth/login" replace /> },
      { path: "login", element: <Login /> },
      { path: "signup/:role", element: <Signup /> },
      { path: "forget", element: <Forgot /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verify-email", element: <EmailVerification /> },
      { path: "email-verification", element: <VerifyEmail /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      {
        path: "/dashboard/calendar",
        element: (
          <TrustProtectedRoute>
            <Calendar />
          </TrustProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/add",
        element: (
          <TrustProtectedRoute>
            <CreateEvent />
          </TrustProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:id",
        element: (
          <TrustProtectedRoute>
            <CreateEvent />
          </TrustProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/event-list",
        element: (
          <TrustProtectedRoute>
            <EventList />
          </TrustProtectedRoute>
        ),
      },
      { path: "/dashboard/about", element: <About /> },
      { path: "/dashboard/school-overview", element: <SchoolOverview /> },
      {
        path: "/dashboard/school-overview/:mode",
        element: <SchoolFormSubmission />,
      },
      {
        path: "/dashboard/school-overview/:mode/:schoolId",
        element: <SchoolFormSubmission />,
      },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/sub-plan", element: <SubscriptionCard /> },
      {
        path: "/dashboard/calendar/events/:eventId/contents",
        element: (
          <TrustProtectedRoute>
            <EventContents />
          </TrustProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents/:contentId/preview",
        element: (
          <TrustProtectedRoute>
            <EventContents />
          </TrustProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents/:contentId",
        element: (
          <TrustProtectedRoute>
            <CreateContent />
          </TrustProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents/add",
        element: (
          <TrustProtectedRoute>
            <CreateContent />
          </TrustProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/not-found",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
