import classNames from "classnames/bind";
import { UserAuth } from "../../../context/AuthContext";
import styles from "./DefaultLayout.module.scss";
import Header from "./Header";
import Sidebar from "./Sidebar";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  const { role } = UserAuth();

  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        {role === 1 && <Sidebar />}
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
