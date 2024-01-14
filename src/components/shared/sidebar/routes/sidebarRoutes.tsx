import { ISidebarRoute } from "../sidebar.types";

export const sidebarRoutes: ISidebarRoute[] = [
  {
    path: "/order",
    translate: "Orders",
    role: "_id",
  },
  {
    path: "/category",
    translate: "Categories",
    role: "_id",
  },

  {
    path: "/product",
    translate: "Products",
    role: "_id",
  },
  {
    path: "/promocodes",
    translate: "Promocodes",
    role: "_id",
  },
  {
    path: "/banner",
    translate: "Banners",
    role: "_id",
  },

  {
    path: "/customer",
    translate: "Users",
    role: "_id",
  },

  {
    path: "/finance",
    translate: "Finance",
    role: "_id",
  },
  {
    path: "/settings",
    translate: "Settings",
    role: "_id",
  },
];
