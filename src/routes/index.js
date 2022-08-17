import Header from "../components/Layout/DefaultLayout/Header";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Product";

// Route
const publicRoutes = [
  { path: "/", component: Home },
  { path: "/product", component: Product },
  { path: "/login", component: Login, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
