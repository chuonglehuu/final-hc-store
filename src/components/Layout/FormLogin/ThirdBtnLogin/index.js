import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import { toastMessage } from "../../../../utils/toast";
import styles from "./ThirdBtnLogin.module.scss";

const cx = classNames.bind(styles);

function ThirdBtnLogin() {
  const navigate = useNavigate();
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      toastMessage("error", error.message);
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
