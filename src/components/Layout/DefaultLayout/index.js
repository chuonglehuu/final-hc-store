import classNames from "classnames/bind";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { AuthContextProvider } from "../../../context/AuthContext";

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <AuthContextProvider>
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("container")}>
          <Sidebar />
          <div className={cx("content")}>{children}</div>
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
}

export default DefaultLayout;
