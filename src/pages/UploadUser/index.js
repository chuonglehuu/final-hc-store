import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext";
import classNames from "classnames/bind";
import styles from "./UploadUser.module.scss";
import { useNavigate } from "react-router-dom";
import {
  setDoc,
  doc,
  Timestamp,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

const cx = classNames.bind(styles);

function UploadUser() {
  const { user, setRole } = UserAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "users", user.email), {
        email: user.email,
        uid: user.uid,
        fullname: fullName,
        phone: phone,
        dob: dob,
        createAt: Timestamp.fromDate(new Date()),
        listCart_ID: "",
        receipt_ID: "",
        role: 2,
      });
      setRole(2);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const userRef = collection(db, "users");
    const userQuery = query(userRef, where("email", "==", user.email));
    onSnapshot(userQuery, (snapshot) => {
      let data = [];
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      if (user.email === data[0].email) {
        navigate("/");
      }
    });
  }, []);
  return (
    <div className={cx("upload")}>
      <form onSubmit={handleSubmit} className={cx("form-upload")}>
        <h1>Update User Information</h1>
        <div className={cx("form-info")}>
          <div>
            <label>Email</label>
            <input
              value={user?.email || ""}
              type="email"
              required
              disabled
            ></input>
          </div>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              required
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            ></input>
          </div>
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              required
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            ></input>
          </div>
          <div>
            <label>Date of birth</label>
            <input
              type="date"
              required
              onChange={(e) => setDob(e.target.value)}
              value={dob}
            ></input>
          </div>
          <button>Update Information</button>
        </div>
      </form>
    </div>
  );
}

export default UploadUser;
