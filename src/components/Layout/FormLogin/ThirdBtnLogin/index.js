import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./ThirdBtnLogin.module.scss";
import { UserAuth } from "../../../../context/AuthContext";

const cx = classNames.bind(styles);

function ThirdBtnLogin() {
  const navigate = useNavigate();
  const { googleSignIn, user } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("btn")}>
      <div className={cx("google")} onClick={handleGoogleSignIn}>
        <FontAwesomeIcon icon={faGoogle} />
        <button>Login with Google</button>
      </div>
    </div>
  );
}

export default ThirdBtnLogin;
