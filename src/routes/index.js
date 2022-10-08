import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Product";
import About from "../pages/About";
import Social from "../pages/Social";
import HomeOnly from "../components/Layout/HomeOnly";
import SignUp from "../pages/Register";
import UploadUser from "../pages/UploadUser";
import ForgotPassword from "../pages/ForgotPassword";
import AdminProduct from "../pages/Admin/AdminProduct";
import DefaultLayout from "../components/AdminLayout/DefaultLayout";

// Route
const publicRoutes = [
  { path: "/", component: Home, layout: HomeOnly },
  { path: "/about", component: About },
  { path: "/product", component: Product },
  { path: "/social", component: Social },
  { path: "/login", component: Login, layout: null },
  { path: "/register", component: SignUp, layout: null },
  {
    path: "/upload-user",
    component: UploadUser,
    protected: true,
    layout: HomeOnly,
  },
  { path: "/forgot-password", component: ForgotPassword, layout: HomeOnly },
  {
    path: "/admin/product",
    component: AdminProduct,
    layout: DefaultLayout,
  },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
