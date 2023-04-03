import classNames from "classnames/bind";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../../assets/Image/loginIP.png";
import { UserAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/config";
import ThirdBtnLogin from "../FormLogin/ThirdBtnLogin";
import styles from "./FormLogin.module.scss";

const cx = classNames.bind(styles);

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, setRole } = UserAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await logIn(email, password);

      const querySnapshot = await getDocs(
        query(collection(db, "users"), where("email", "==", res.user.email))
      );
      if (querySnapshot.docs.length > 0) {
        // Lấy thông tin role của người dùng từ tài liệu đầu tiên
        const userDoc = querySnapshot.docs[0];
        const userRole = userDoc.data().role;
        setRole(userRole);
        if (userRole === 0) navigate("/admin");
        if (userRole === 1) navigate("/manager");
        if (userRole === 2) navigate("/");
      } else {
        console.log("User not found");
      }
    } catch (error) {
      alert(error);
    }
  };

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
            <Link to="/forgot-password">
              <p>Forgot password?</p>
            </Link>
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
