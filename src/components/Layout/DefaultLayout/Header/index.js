import classNames from "classnames/bind";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import images from "../../../../assets/Image";
import { UserAuth } from "../../../../context/AuthContext";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  const { user, logOut, role } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
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
          <Link to="/chat">
            <div className={cx("item")}>Chat</div>
          </Link>
          {role === 2 && (
            <Link to="/orders">
              <div className={cx("item")}>Orders</div>
            </Link>
          )}
        </div>
        {user?.email ? (
          <div className={cx("user-logout")}>
            <div className={cx("info-user")}>
              <span>Welcome</span>
              <span>{user.email}</span>
            </div>
            <div className={cx("logout")}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <div className={cx("login")}>
            <Link to="/register">
              <div className={cx("register")}>
                <button>Register</button>
              </div>
            </Link>
            <div className={cx("sign-in")}>
              <Link className={cx("btn-login")} to="/login">
                <button>Sign In</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
