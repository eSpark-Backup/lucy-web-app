import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../components/Layouts/AuthLayout";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Forgot from "../components/auth/Forget";
import DashboardLayout from "../components/Layouts/DashboardLayout";
import LandingPage from "../components/Layouts/LandingPage";
import Dashboard from "../components/dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import Calendar from "../components/dashboard/Calendar";
import About from "../components/dashboard/About";
import NotFound from "../components/NotFound";
import Profile from "../components/dashboard/Profile";
import SubscriptionCard from "../components/dashboard/Subscription";
import CreateEvent from "../components/dashboard/CreateEvent";
import CreateContent from "../components/dashboard/CreateContent";
import EventDetails from "../components/dashboard/EventDetails";
import EventList from "../components/dashboard/EventList";
import EventContents from "../components/dashboard/EventContents";
import { Navigate } from "react-router-dom";
import GotLost from "../components/auth/GotLost";

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
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
      { path: "signup", element: <Signup /> },
      { path: "forget", element: <Forgot /> },
      { path: "got-lost", element: <GotLost /> },
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
      { path: "/dashboard/calendar", element: <Calendar /> },
      { path: "/dashboard/calendar/create-event", element: <CreateEvent /> },
      {
        path: "/dashboard/calendar/create-event/:id",
        element: <CreateEvent />,
      },
      {
        path: "/dashboard/calendar/create-content",
        element: <CreateContent />,
      },
      {
        path: "/dashboard/calendar/create-content/:id",
        element: <CreateContent />,
      },
      {
        path: "/dashboard/calendar/event-details",
        element: <EventDetails />,
      },
      {
        path: "/dashboard/calendar/event-list",
        element: <EventList />,
      },
      { path: "/dashboard/about", element: <About /> },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/sub-plan", element: <SubscriptionCard /> },

      // new added
      {
        path: "/dashboard/calendar/contents",
        element: <EventContents />,
      },
      {
        path: "/dashboard/calendar/create-event/:id/content/:id",
        element: <EventContents />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
