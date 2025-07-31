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
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
      { path: "/auth/forget", element: <Forgot /> },
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
      { path: "/dashboard/about", element: <About /> },
      { path: "/dashboard/profile", element: <Profile /> },
      { path: "/dashboard/sub-plan", element: <SubscriptionCard /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
