import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import { addProduct } from "../../../../firebase/service";
import styles from "./AddProduct.module.scss";

const cx = classNames.bind(styles);
function AddProduct({ setOpen }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState("");
  const [promo, setPromo] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [imgUpload, setImgUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addProduct(name, category, des, price, promo, currentPrice, imgUpload);
      setOpen(false);
      alert("Create new product successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const total = price - (price * promo) / 100;
    setCurrentPrice(total);
  }, [promo, price]);

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

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

          <FormControl sx={{ width: "80%", marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Choose a category"
              onChange={(e) => setCategory(e.target.value)}
              required
              sx={{textAlign: 'start' }}
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
          <input
            className={styles.input_img}
            type="file"
            onChange={(e) => {
              setImgUpload(e.target.files[0]);
            }}
            required
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
