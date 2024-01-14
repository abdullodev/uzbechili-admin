import Login from "pages/login";
import { Navigate, RouteObject } from "react-router-dom";

const publicRoutes: RouteObject[] = [
  {
    element: <Login />,
    path: "login",
  },
  // {
  //   element: <Navigate to="/login" replace />,
  //   path: "*",
  // },
];

export default publicRoutes;
