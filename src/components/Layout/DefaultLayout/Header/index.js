import { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./Header.module.scss";
import images from "../../../../assets/Image";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
  const [searchResult, setSearchResult] = useState([]);
  return (
    <header className={cx("wrapper")}>
      <div className={cx("content")}>
        <Link to="/">
          <img className={cx("logo")} src={images.logo} alt="Logo" />
        </Link>

        <Tippy
          render={(attrs) => {
            <div className={cx("search-result")} tabIndex="-1" {...attrs}>
              kết quả
            </div>;
          }}
        >
          <div className={cx("search")}>
            <input placeholder="Search product or item" spellCheck={false} />
            <button className={cx("clear")} title="Search">
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            <button className={cx("search-btn")}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </Tippy>

        <div className={cx("actions")}></div>
      </div>
    </header>
  );
}

export default Header;
