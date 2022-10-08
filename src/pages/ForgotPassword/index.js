import styles from "./ForgotPassword.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";

const cx = classNames.bind(styles);
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = UserAuth();

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      console.log("send your email");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className={cx("main")}>
      <div className={cx("forgot")}>
        <h1 className={cx("title")}>Forgot Password</h1>
        <form onSubmit={submitEmail} className={cx("form-forgot")}>
          <label>Email address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            required
          ></input>
          <button>Submit</button>
        </form>
        <div className={cx("or")}>
          <p className={cx("text")}> Or </p>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
