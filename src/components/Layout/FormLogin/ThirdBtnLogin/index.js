import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

import classNames from "classnames/bind";
import styles from "./ThirdBtnLogin.module.scss";

const cx = classNames.bind(styles);

function ThirdBtnLogin() {
  return (
    <div className={cx("btn")}>
      <div className={cx("google")}>
        <FontAwesomeIcon icon={faGoogle} />
        <p>Login with Google</p>
      </div>
      <div className={cx("facebook")}>
        <FontAwesomeIcon icon={faFacebook} />
        <p>Login with Facebook</p>
      </div>
    </div>
  );
}

export default ThirdBtnLogin;
