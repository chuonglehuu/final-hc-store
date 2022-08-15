import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import loginImg from "../../assets/Image/loginIP.png";
import ThirdBtnLogin from "../ThirdBtnLogin";

const cx = classNames.bind(styles);

function Login() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("loginImg")}>
          <img src={loginImg} alt="Login" />
        </div>
        <div className={cx("loginForm")}>
          <h2 className={cx("loginTitle")}>Login</h2>
          <div className={cx("username")}>
            <label>Enter Username</label>
            <input placeholder="Username"></input>
          </div>
          <div className={cx("password")}>
            <label>Enter Password</label>
            <input type="password" placeholder="Password"></input>
          </div>
          <div className={cx("btnLogin")}>
            <button>Login</button>
          </div>
          <div className={cx("register")}>
            <label>Don't have any account?</label>
            <a href="/">Sign up</a>
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

export default Login;
