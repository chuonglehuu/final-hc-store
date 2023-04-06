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
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../../firebase/config";
import { updateProduct } from "../../../../firebase/service";
import styles from "../AddProduct/AddProduct.module.scss";

const cx = classNames.bind(styles);
function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("" || data.name);
  const [category, setCategory] = useState(data.type);
  const [desc, setDesc] = useState(data.desc);
  const [price, setPrice] = useState(data.price);
  const [promo, setPromo] = useState(data.promo);
  const [currentPrice, setCurrentPrice] = useState(data.new_price);

  useEffect(() => {
    const total = price - (price * promo) / 100;
    setCurrentPrice(total);
  }, [promo, price]);

  const update = async (id, name, type, desc, price, promo, new_price) => {
    try {
      await updateProduct(id, name, type, desc, price, promo, new_price);
      navigate("/manager");
    } catch (error) {
      alert(error.message);
    }
  };

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
        <h2 className={cx("title")}>Update Product</h2>
        <form className={cx("form-add")}>
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

          <TextField
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
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
            onClick={() => {
              update(data.id, name, category, desc, price, promo, currentPrice);
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
