import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { Button, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { addOrder } from "../../../firebase/service";
import styles from "./ConfirmAddress.module.scss";

const cx = classNames.bind(styles);

function ConfirmAddress({
  setOpen,
  emailUser,
  userName,
  productName,
  productPrice,
}) {
  const { userDetail } = UserAuth();

  const [address, setAddress] = useState(userDetail.address || "");
  const [phoneNumber, setPhoneNumber] = useState(userDetail.phone || "");

  const handleChangePhoneNumber = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addOrder(
        emailUser,
        userName,
        phoneNumber,
        address,
        productName,
        productPrice
      );
      alert("Đã đặt hàng thành công");
      setOpen(false);
    } catch (e) {
      console.log("Error order: ", e);
    }
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Confirm Order</h2>
        <form className={cx("form-add")} onSubmit={handleSubmit}>
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
            autoFocus
          />
          <TextField
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            id="outlined-basic"
            label="Phone number"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
            type="text"
          />

          <Button
            sx={{ width: "80%", marginTop: 2 }}
            variant="contained"
            startIcon={<BookmarkAddedOutlinedIcon />}
            type="submit"
          >
            Confirm Address
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmAddress;
