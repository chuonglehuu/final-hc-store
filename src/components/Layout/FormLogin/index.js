import { useState } from "react";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import styles from "./FormLogin.module.scss";
import loginImg from "../../../assets/Image/loginIP.png";
import ThirdBtnLogin from "../FormLogin/ThirdBtnLogin";
import { UserAuth } from "../../../context/AuthContext";

const cx = classNames.bind(styles);

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, logIn } = UserAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate("/upload-user");
    } catch (error) {
      alert(error);
    }
  };
  const navigate = useNavigate();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("loginImg")}>
          <img src={loginImg} alt="Login" />
        </div>
        <div className={cx("loginForm")}>
          <form onSubmit={handleLogin} className={cx("form")}>
            <h2 className={cx("loginTitle")}>Login</h2>
            <div className={cx("username")}>
              <label>Enter Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                autoComplete="email"
              ></input>
            </div>
            <div className={cx("password")}>
              <label>Enter Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              ></input>
            </div>
            <div className={cx("btnLogin")}>
              <button>Login</button>
            </div>
          </form>
          <div className={cx("register")}>
            <label>Don't have any account?</label>
            <Link to="/register">
              <p>Sign up</p>
            </Link>
          </div>
          <p className={cx("another")}>Or</p>
          <div className={cx("loginThirdParty")}>
            <ThirdBtnLogin />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
