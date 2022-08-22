import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react/headless";
// import "tippy.js/dist/tippy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <div className={cx("nav")}>
          <Link to="/">
            <div className={cx("item")}>Home</div>
          </Link>
          <Link to="/product">
            <div className={cx("item")}>Product</div>
          </Link>
          <Link to="/social">
            <div className={cx("item")}>Social</div>
          </Link>
          <Link to="/about">
            <div className={cx("item")}>About Us</div>
          </Link>
        </div>
        <div className={cx("login")}>
          <Link to="/register">
            <div className={cx("register")}>Resigter</div>
          </Link>
          <div className={cx("sign-in")}>
            <Link className={cx("btn-login")} to="/login">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
