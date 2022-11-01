import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { TextField, Button } from "@mui/material";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import {
  Timestamp,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import styles from "../AddProduct/AddProduct.module.scss";
import { db } from "../../../../firebase/config";

const cx = classNames.bind(styles);
function UpdateProduct(id) {
  const [name, setName] = useState("");
  const [catagory, setCatagory] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [promo, setPromo] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const navigate = useNavigate();
  console.log(id);
  // useEffect(() => {
  //   onSnapshot(doc(db, "products", id), (docs) => {
  //     // setName(docs.data().name);
  //     // setCatagory(docs.data().type);
  //     // setDes(docs.data().description);
  //     // setPrice(docs.data().old_price);
  //     // setPromo(docs.data().promotion);
  //     console.log(docs.data());
  //   });
  // }, []);

  // const docSnap = getDoc(doc(db, "products", id));
  // console.log(docSnap.data());

  useEffect(() => {
    const queryInfo = async () => {
      await onSnapshot(doc(db, "products", id), (docs) => {
        console.log(docs.data());
      });
    };
    queryInfo();
  }, []);

  useEffect(() => {
    const total = price - (price * promo) / 100;
    setCurrentPrice(total);
  }, [promo, price]);

  const updateProduct = async (Id) => {
    try {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        name: name,
        type: catagory,
        description: des,
        old_price: price.toString(),
        promotion: promo.toString(),
        new_price: currentPrice.toString(),
        update_at: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Update Product</h2>
        <form className={cx("form-add")} onClick={() => updateProduct(id)}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Product Name"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
            autoFocus
          />
          <TextField
            value={catagory}
            onChange={(e) => setCatagory(e.target.value)}
            id="outlined-basic"
            label="Catagory"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
          />
          <TextField
            value={des}
            onChange={(e) => setDes(e.target.value)}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            sx={{ width: "28%", marginTop: "20px" }}
            required
            type="number"
            min="0"
          />
          <TextField
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            id="outlined-basic"
            label="Promotion %"
            variant="outlined"
            sx={{ width: "25%", marginTop: "20px", marginLeft: 1 }}
            min="0"
            max="100"
            required
          />
          <TextField
            disabled
            value={currentPrice}
            id="outlined-basic"
            label="Current Price"
            variant="outlined"
            sx={{ width: "25%", marginTop: "20px", marginLeft: 1 }}
            required
            type="number"
          />
          <Button
            sx={{ width: "80%", marginTop: 2 }}
            variant="contained"
            startIcon={<BookmarkAddedOutlinedIcon />}
            type="submit"
          >
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
