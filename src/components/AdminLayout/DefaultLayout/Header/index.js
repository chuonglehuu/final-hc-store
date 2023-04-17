import ChatIcon from "@mui/icons-material/Chat";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import images from "../../../../assets/Image";
import { UserAuth } from "../../../../context/AuthContext";
import styles from "./Header.module.scss";
const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const { logOut, userDetail } = UserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  const navigateChatPage = () => {
    navigate("/chat");
  };

  return (
    <header>
      <div className={cx("main")}>
        <div className={cx("content")}>
          <div className={cx("logo")}>
            <a href="/">
              <img
                className={cx("logo-img")}
                src={images.logo}
                alt="Logo-HC Store"
              />
            </a>
          </div>
          <div className={cx("button-logout")}>
            <span>Welcome {userDetail.role === 0 ? "Admin" : "Manager"}!</span>
            {userDetail.role === 0 && (
              <div className={cx("button-chat")} onClick={navigateChatPage}>
                <ChatIcon />
              </div>
            )}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
