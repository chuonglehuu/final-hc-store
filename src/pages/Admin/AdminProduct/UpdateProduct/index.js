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
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../../../firebase/config";
import { updateProduct } from "../../../../firebase/service";
import { toastMessage } from "../../../../utils/toast";
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
  const [price, setPrice] = useState(
    parseInt(data.price.replace(/,/g, "")).toLocaleString("en-US")
  );
  const [promo, setPromo] = useState(data.promo);
  const [currentPrice, setCurrentPrice] = useState(
    parseInt(data.new_price.replace(/,/g, "")).toLocaleString("en-US")
  );

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

  const update = async (id, name, type, desc, price, promo, new_price) => {
    const newPrice = parseInt(price.replace(/,/g, ""));
    const newCurrentPrice = parseInt(new_price.replace(/,/g, ""));

    try {
      await updateProduct(
        id,
        name,
        type,
        desc,
        newPrice,
        promo,
        newCurrentPrice
      );
      navigate("/manager");
      toastMessage("success", "Update product successfully");
    } catch (error) {
      toastMessage("error", error.message);
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
    <div>
      <Helmet>
        <title>Update Product</title>
        <meta name="description" content="" />
      </Helmet>
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

            <TextareaAutosize
              aria-label="minimum height"
              minRows={3}
              placeholder="Description"
              value={desc}
              onChange={(event) => setDesc(event.target.value)}
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
            />
            <Button
              sx={{ width: "80%", marginTop: 2 }}
              variant="contained"
              startIcon={<BookmarkAddedOutlinedIcon />}
              onClick={() => {
                update(
                  data.id,
                  name,
                  category,
                  desc,
                  price,
                  promo,
                  currentPrice
                );
              }}
            >
              Save Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
