import classNames from "classnames/bind";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import images from "../../../../assets/Image";
import { UserAuth } from "../../../../context/AuthContext";
import { toastMessage } from "../../../../utils/toast";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  const { user, logOut, role, userDetail } = UserAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      toastMessage("error", error.message);
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

          {user && role === 1 && (
            <Link to="/manager/dashboard">
              <div className={cx("item")}>Dashboard</div>
            </Link>
          )}

          {user && role === 0 && (
            <Link to="/admin/dashboard">
              <div className={cx("item")}>Dashboard</div>
            </Link>
          )}

          {user && (role === 0 || role === 2) && (
            <Link to="/chat">
              <div className={cx("item")}>Chat</div>
            </Link>
          )}
          {user && role === 2 && (
            <Link to="/orders">
              <div className={cx("item")}>Orders</div>
            </Link>
          )}
        </div>
        {user && userDetail ? (
          <div className={cx("user-logout")}>
            <div className={cx("info-user")}>
              <span>Welcome</span>
              <span style={{ fontSize: "18px", fontWeight: "bold", marginRight: "12px" }}>
                {userDetail?.fullname}
              </span>
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
