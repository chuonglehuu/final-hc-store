import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { Button, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import { auth } from "../../../../firebase/config";
import { addManager } from "../../../../firebase/service";
import styles from "./AddManager.module.scss";

const cx = classNames.bind(styles);

function AddCategory({ setOpen }) {
  const { logOut, logIn, setRole } = UserAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleChangePhoneNumber = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPhone(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(auth, email, "123123");
      await addManager(name, email, phone, address, data.user.uid);
      await logOut();
      await logIn("hcadmin@gmail.com", "123123");
      navigate("/admin");
      setRole(0);
      setOpen(false);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("The email address has been used");
      }
      console.log({ error });
    }
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Create new manager</h2>
        <form className={cx("form-add")} onSubmit={handleSubmit}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
            autoFocus
          />

          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
          />

          <TextField
            value={phone}
            onChange={handleChangePhoneNumber}
            type="text"
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
            type="submit"
          >
            Create manager
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
