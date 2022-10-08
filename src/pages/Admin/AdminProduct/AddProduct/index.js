import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { TextField, Button } from "@mui/material";
import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { db } from "../../../../firebase/config";
import styles from "./AddProduct.module.scss";

const cx = classNames.bind(styles);
function AddProduct() {
  const [name, setName] = useState("");
  const [catagory, setCatagory] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [promo, setPromo] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = collection(db, "products");
      await addDoc(docRef, {
        name: name,
        type: catagory,
        description: des,
        old_price: price.toString(),
        promotion: promo.toString(),
        new_price: currentPrice.toString(),
        create_at: Timestamp.fromDate(new Date()),
      });
      alert("success");
      navigate("/admin/product");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const total = price - (price * promo) / 100;
    setCurrentPrice(total);
  }, [promo, price]);
  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Add New Product</h2>
        <form className={cx("form-add")} onSubmit={handleSubmit}>
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

export default AddProduct;
