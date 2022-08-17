import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import images from "../../../../assets/Image";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx("wrapper")}>
      <div className={cx("content")}>
        <Link to="/">
          <img className={cx("logo")} src={images.logo} alt="Logo" />
        </Link>
        <div className={cx("search")}>
          <input placeholder="Search product or item" spellCheck={false} />
          <button className={cx("clear")}>
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className={cx("actions")}></div>
      </div>
    </header>
  );
}

export default Header;
