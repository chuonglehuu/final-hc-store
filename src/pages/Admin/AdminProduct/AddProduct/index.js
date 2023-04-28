import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../../firebase/config";
import { addProduct } from "../../../../firebase/service";
import { toastMessage } from "../../../../utils/toast";
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
    const newPrice = parseInt(price.replace(/,/g, ""));
    const newCurrentPrice = parseInt(currentPrice.replace(/,/g, ""));
    try {
      addProduct(
        name,
        category,
        des,
        newPrice,
        promo,
        newCurrentPrice,
        imgUpload
      );
      setOpen(false);
      toastMessage("success", "Create new product successfully");
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  const handleValueChange = (event) => {
    const input = event.target.value;
    const number = parseInt(input.replace(/[^0-9]/g, ""), 10);
    const formatted = number.toLocaleString("en-US");
    setPrice(formatted);
  };

  useEffect(() => {
    const newPrice = parseInt(price.replace(/,/g, ""));

    const total = newPrice - (newPrice * promo) / 100;

    const totalFormat = total.toLocaleString("en-US");

    setCurrentPrice(totalFormat);
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
              sx={{ textAlign: "start" }}
            >
              {categories.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Description"
            value={des}
            onChange={(event) => setDes(event.target.value)}
            style={{
              width: "80%",
              marginTop: "20px",
              resize: "none",
              padding: "6px",
            }}
            required
          />
          <TextField
            value={price}
            onChange={handleValueChange}
            id="outlined-basic"
            label="Price"
            variant="outlined"
            sx={{ width: "28%", marginTop: "20px" }}
            required
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
            inputProps={{
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
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
