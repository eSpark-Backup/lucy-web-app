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
import CalendarProtectedRoute from "./CalendarProtectedRoute";
import SchoolProtectedRoute from "./SchoolProtectedRoute";

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
          <CalendarProtectedRoute>
            <Calendar />
          </CalendarProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/add",
        element: (
          <CalendarProtectedRoute>
            <CreateEvent />
          </CalendarProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:id",
        element: (
          <CalendarProtectedRoute>
            <CreateEvent />
          </CalendarProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/event-list",
        element: (
          <CalendarProtectedRoute>
            <EventList />
          </CalendarProtectedRoute>
        ),
      },
      { path: "/dashboard/about", element: <About /> },
      {
        path: "/dashboard/school-overview",
        element: (
          <SchoolProtectedRoute>
            <SchoolOverview />
          </SchoolProtectedRoute>
        ),
      },
      {
        path: "/dashboard/school-overview/:mode",
        element: (
          <SchoolProtectedRoute>
            <SchoolFormSubmission />
          </SchoolProtectedRoute>
        ),
      },
      {
        path: "/dashboard/school-overview/:mode/:schoolId",
        element: (
          <SchoolProtectedRoute>
            <SchoolFormSubmission />
          </SchoolProtectedRoute>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <SchoolProtectedRoute>
            <Profile />
          </SchoolProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents",
        element: (
          <CalendarProtectedRoute>
            <EventContents />
          </CalendarProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents/:contentId/preview",
        element: (
          <CalendarProtectedRoute>
            <EventContents />
          </CalendarProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents/:contentId",
        element: (
          <CalendarProtectedRoute>
            <CreateContent />
          </CalendarProtectedRoute>
        ),
      },
      {
        path: "/dashboard/calendar/events/:eventId/contents/add",
        element: (
          <CalendarProtectedRoute>
            <CreateContent />
          </CalendarProtectedRoute>
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
