import classNames from "classnames/bind";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/Image/loginIP.png";
import styles from "../../components/Layout/FormLogin/FormLogin.module.scss";
import { UserAuth } from "../../context/AuthContext";

const cx = classNames.bind(styles);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("loginImg")}>
          <img src={loginImg} alt="SignUp" />
        </div>
        <div className={cx("loginForm")}>
          <h2 className={cx("loginTitle")}>Sign Up</h2>
          <form onSubmit={handleSubmit} className={cx("form")}>
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
              <button>Sign Up</button>
            </div>
          </form>
          <div className={cx("register")}>
            <label>Already subcribed to HC Store ?</label>
            <Link to="/login">
              <p>Sign In</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
