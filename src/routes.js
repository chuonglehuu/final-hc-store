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
import AdminProduct from "./pages/Admin/AdminProduct";
import UpdateProduct from "./pages/Admin/AdminProduct/UpdateProduct";
import AdminUser from "./pages/Admin/AdminUser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Social from "./pages/Social";
import UploadUser from "./pages/UploadUser";

const DEFAULT_PATHS = ["/", "/about", "/product", "/social"];
const PATHS = ["/", "/about", "/product", "/social", "/login", "/register"];
const MANAGER_PATHS = [
  "/manager",
  "/manager/categories",
  "/manager/update-product",
  "/manager/update-category",
];

export default function Router() {
  const { user, role, setRole } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchUserRole = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    if (querySnapshot.docs.length > 0) {
      const userDoc = querySnapshot.docs[0];
      const userRole = userDoc.data().role;
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
      location.pathname !== "/admin"
    ) {
      navigate("/admin");
    }

    if (role === 2 && !DEFAULT_PATHS.includes(location.pathname)) {
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
      element: !user ? <Login /> : <NotFound />,
    },
    {
      path: "/register",
      element: !user ? <Register /> : <NotFound />,
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
      path: "/social",
      element: (
        <DefaultLayout>
          <Social />
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
      path: "/admin",
      element:
        role === 0 ? (
          <AdminLayout>
            <AdminUser />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager",
      element:
        role === 1 ? (
          <AdminLayout>
            <AdminProduct />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager/categories",
      element:
        role === 1 ? (
          <AdminLayout>
            <AdminCategory />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager/update-product",
      element:
        role === 1 ? (
          <AdminLayout>
            <UpdateProduct />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
    {
      path: "/manager/update-category",
      element:
        role === 1 ? (
          <AdminLayout>
            <UpdateCategory />
          </AdminLayout>
        ) : (
          <NotFound />
        ),
    },
  ]);
}
