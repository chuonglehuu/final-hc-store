import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout/DefaultLayout";
import DefaultLayout from "./components/Layout/DefaultLayout";
import HomeOnly from "./components/Layout/HomeOnly";
import { UserAuth } from "./context/AuthContext";
import { db } from "./firebase/config";
import About from "./pages/About";
import AdminCategory from "./pages/Admin/AdminCategory";
import UpdateCategory from "./pages/Admin/AdminCategory/UpdateCategory";
import AdminOrder from "./pages/Admin/AdminOrder";
import AdminProduct from "./pages/Admin/AdminProduct";
import UpdateProduct from "./pages/Admin/AdminProduct/UpdateProduct";
import AdminUser from "./pages/Admin/AdminUser";
import UpdateManager from "./pages/Admin/AdminUser/UpdateManager";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Register from "./pages/Register";
import UploadUser from "./pages/UploadUser";

const USER_PATHS = [
  "/",
  "/about",
  "/product",
  "/chat",
  "/orders",
  "/product/detail",
  "/upload-user",
];

const DEFAULT_PATHS = [
  "/",
  "/about",
  "/product",
  "/orders",
  "/product/detail",
  "/upload-user",
];
const PATHS = ["/", "/about", "/product", "/login", "/register"];
const MANAGER_PATHS = [
  "/manager",
  "/manager/categories",
  "/manager/update-product",
  "/manager/update-category",
  "/manager/dashboard",
  "/manager/orders",
];
const ADMIN_PATHS = [
  "/admin",
  "/admin/update-manager",
  "/admin/dashboard",
  "/chat",
];

export default function Router() {
  const { user, role, setRole, setUserDetail } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserRole = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    if (querySnapshot.docs.length > 0) {
      const userDoc = querySnapshot.docs[0];
      const userRole = userDoc.data().role;
      setUserDetail(userDoc.data());
      setRole(userRole);
    } else {
      console.log("User not found");
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  useEffect(() => {
    if (
      role === 1 &&
      !MANAGER_PATHS.includes(location.pathname) &&
      !DEFAULT_PATHS.includes(location.pathname)
    ) {
      navigate("/manager");
    }

    if (
      role === 0 &&
      !DEFAULT_PATHS.includes(location.pathname) &&
      !ADMIN_PATHS.includes(location.pathname)
    ) {
      navigate("/admin");
    }

    if (role === 2 && !USER_PATHS.includes(location.pathname)) {
      navigate("/");
    }

    if (!user && !PATHS.includes(location.pathname)) {
      navigate("/");
    }
  }, [role, user]);

  return useRoutes([
    {
      path: "/",
      element: (
        <HomeOnly>
          <Home />
        </HomeOnly>
      ),
    },
    {
      path: "/login",
      element: !user && <Login />,
    },
    {
      path: "/register",
      element: !user && <Register />,
    },
    {
      path: "/about",
      element: (
        <DefaultLayout>
          <About />
        </DefaultLayout>
      ),
    },
    {
      path: "/product",
      element: (
        <DefaultLayout>
          <Product />
        </DefaultLayout>
      ),
    },
    {
      path: "/product/detail",
      element: (
        <DefaultLayout>
          <ProductDetail />
        </DefaultLayout>
      ),
    },
    {
      path: "/chat",
      element: (role === 0 || role === 2) && (
        <DefaultLayout>
          <Chat />
        </DefaultLayout>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <HomeOnly>
          <ForgotPassword />
        </HomeOnly>
      ),
    },
    {
      path: "/upload-user",
      element: (
        <HomeOnly>
          <UploadUser />
        </HomeOnly>
      ),
    },
    {
      path: "/orders",
      element: role === 2 && (
        <DefaultLayout>
          <Order />
        </DefaultLayout>
      ),
    },
    {
      path: "/admin",
      element: role === 0 && (
        <AdminLayout>
          <AdminUser />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/update-manager",
      element: role === 0 && (
        <AdminLayout>
          <UpdateManager />
        </AdminLayout>
      ),
    },
    {
      path: "/admin/dashboard",
      element: role === 0 && (
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      ),
    },
    {
      path: "/manager",
      element: role === 1 && (
        <AdminLayout>
          <AdminProduct />
        </AdminLayout>
      ),
    },
    {
      path: "/manager/categories",
      element: role === 1 && (
        <AdminLayout>
          <AdminCategory />
        </AdminLayout>
      ),
    },
    {
      path: "/manager/update-product",
      element: role === 1 && (
        <AdminLayout>
          <UpdateProduct />
        </AdminLayout>
      ),
    },
    {
      path: "/manager/update-category",
      element: role === 1 && (
        <AdminLayout>
          <UpdateCategory />
        </AdminLayout>
      ),
    },
    {
      path: "/manager/dashboard",
      element: role === 1 && (
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      ),
    },
    {
      path: "/manager/orders",
      element: role === 1 && (
        <AdminLayout>
          <AdminOrder />
        </AdminLayout>
      ),
    },
  ]);
}
