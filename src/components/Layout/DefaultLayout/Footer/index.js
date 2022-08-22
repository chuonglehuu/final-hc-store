import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faPhone,
  faEnvelope,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Footer.module.scss";
import images from "../../../../assets/Image";
import locations from "./ListLocation";
import { contactMail, contactPhone } from "./ListContact";
import follow from "./ListFollow";

const cx = classNames.bind(styles);
function Footer() {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("content")}>
          <div className={cx("brand")}>
            <img src={images.logo} alt="Logo" />
          </div>
          <div className={cx("location")}>
            <h4 className={cx("heading")}> Location store </h4>
            {locations.map((location, index) => {
              return (
                <div className={cx("detail")} key={index}>
                  <FontAwesomeIcon
                    className={cx("icon-template")}
                    icon={faStore}
                  />
                  <p key={index}>{location.address}</p>
                </div>
              );
            })}
          </div>
          <div className={cx("contact")}>
            <h4 className={cx("heading")}> Contact us </h4>
            {contactPhone.map((phone, index) => {
              return (
                <div className={cx("detail")} key={index}>
                  <FontAwesomeIcon
                    className={cx("icon-template")}
                    icon={faPhone}
                  />
                  <p key={index}>{phone.phone}</p>
                </div>
              );
            })}
            {contactMail.map((mail, index) => {
              return (
                <div className={cx("detail")} key={index}>
                  <FontAwesomeIcon
                    className={cx("icon-template")}
                    icon={faEnvelope}
                  />
                  <p key={index}>{mail.mail}</p>
                </div>
              );
            })}
          </div>
          <div className={cx("follow-us")}>
            <h4 className={cx("heading")}> Follow us </h4>
            <div className={cx("icon-social")}>
              {follow.map((follow, index) => {
                return (
                  <a href={follow.href} key={index}>
                    <img src={follow.src} alt={follow.src} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className={cx("no-copy")}>
          <FontAwesomeIcon
            className={cx("icon-template")}
            icon={faCopyright}
          ></FontAwesomeIcon>
          <span>HC Store</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
