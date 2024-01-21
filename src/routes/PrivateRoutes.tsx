import { lazy } from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { IRoleData } from "store/reducers/LoginSlice";

const Banner = lazy(() => import("pages/banner"));
const Order = lazy(() => import("pages/order"));
const Customer = lazy(() => import("pages/customer"));
const Product = lazy(() => import("pages/product"));
const Promocodes = lazy(() => import("pages/promocodes"));
const Finance = lazy(() => import("pages/finance"));
const Category = lazy(() => import("pages/category"));
const Settings = lazy(() => import("pages/settings"));

const privateRoutes: (RouteObject & { role: keyof IRoleData })[] = [
  {
    element: <Navigate to="/order" replace />,
    path: "*",
    role: "_id",
  },
  {
    element: <Navigate to="/order" replace />,
    path: "/",
    role: "_id",
  },
  {
    element: <Order />,
    path: "order/*",
    role: "_id",
  },
  {
    element: <Category />,
    path: "category/*",
    role: "_id",
  },
  {
    element: <Product />,
    path: "product",
    role: "_id",
  },
  {
    element: <Promocodes />,
    path: "promocodes",
    role: "_id",
  },

  {
    element: <Banner />,
    path: "banner",
    role: "_id",
  },

  {
    element: <Customer />,
    path: "customer",
    role: "_id",
  },
  {
    element: <Finance />,
    path: "finance",
    role: "_id",
  },
  {
    element: <Settings />,
    path: "settings",
    role: "_id",
  },
];

export default privateRoutes;
