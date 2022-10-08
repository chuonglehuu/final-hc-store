import classNames from "classnames/bind";
import styles from "./HomeOnly.module.scss";
import Header from "../DefaultLayout/Header";
import Footer from "../DefaultLayout/Footer";

const cx = classNames.bind(styles);

function HomeOnly({ children }) {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container")}>
        <div className={cx("content")}>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeOnly;
