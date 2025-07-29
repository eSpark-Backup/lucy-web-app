import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../components/layout/AuthLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Forgot from "../components/auth/Lost";
import PublicRoute from "./PublicRoute";

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      { path: "/", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/lost", element: <Forgot /> },
    ],
  },
  {
    path: "/dashbord",
    element: (
      <PrivateRoute>
        <PrivateLayout />
      </PrivateRoute>
    ),
    // children: [
    //   // { path: dashboard, element: <Dashboard /> },
    //   // { path: calendar, element: <Calendar /> },
    //   // { path: about, element: <About /> },
    // ],
  },
  {
    path: "*",
    // element: <NotFound />,
  },
];

export default routes;
