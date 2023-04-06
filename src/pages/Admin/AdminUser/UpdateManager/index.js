import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { Button, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { updateManager } from "../../../../firebase/service";
import styles from "../AddManager/AddManager.module.scss";

const cx = classNames.bind(styles);
function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [name, setName] = useState("" || data.name);
  const [phone, setPhone] = useState("" || data.phone);
  const [address, setAddress] = useState("" || data.address);

  const update = async (id, name, phone, address) => {
    try {
      await updateManager(id, name, phone, address);
      navigate("/admin");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Update Manager</h2>
        <form className={cx("form-add")}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Manager name"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
            autoFocus
          />
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="outlined-basic"
            label="Phone number"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
          />
          <TextField
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
          />

          <Button
            sx={{ width: "80%", marginTop: 2 }}
            variant="contained"
            startIcon={<BookmarkAddedOutlinedIcon />}
            onClick={() => {
              update(data.id, name, phone, address);
            }}
          >
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
