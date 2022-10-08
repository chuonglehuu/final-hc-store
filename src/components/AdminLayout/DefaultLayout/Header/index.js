import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../../assets/Image";

const cx = classNames.bind(styles);
function Header() {
  return (
    <header>
      <div className={cx("main")}>
        <div className={cx("content")}>
          <div className={cx("logo")}>
            <img
              className={cx("logo-img")}
              src={images.logo}
              alt="Logo-HC Store"
            ></img>
          </div>
          <div className={cx("button-logout")}>
            <span>Welcome Admin!</span>
            <button>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
