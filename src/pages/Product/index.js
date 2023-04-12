import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase/config";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

const ITEMS_PER_PAGE = 6;

function Product() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "products"), async (snapshot) => {
      const temp = [];
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const id = doc.id;

        if (data.url_img) {
          const url = await getDownloadURL(
            ref(storage, `products/${data.url_img}`)
          );

          temp.push({ ...data, id, url_img: url });
        }
        if (!data.url_img) {
          temp.push({ ...data, id });
        }
      }
      if (filter === "all") {
        setProducts(temp);
      }
      if (filter !== "all") {
        const newArr = temp.filter((item) => item.type === filter);
        setProducts(newArr);
      }
    });
  }, [filter]);

  return (
    <>
      <FormControl sx={{ width: "200px", marginTop: "12px" }}>
        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter by"
          onChange={(e) => setFilter(e.target.value)}
        >
          {[{ name: "all", id: "all-id" }].concat(categories).map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={cx("main")}>
        {products
          .slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
          .map((item) => (
            <Card
              key={item.id}
              sx={{
                maxWidth: 345,
                maxHeight: 400,
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                  cursor: "pointer",
                },
                marginBottom: "24px",
              }}
              style={{ border: "1px solid #999" }}
              onClick={() =>
                navigate("/product/detail", {
                  state: item,
                })
              }
            >
              <CardMedia
                sx={{ height: 140 }}
                image={item.url_img}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {item.new_price}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ maxHeight: "40px" }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        <div className={cx("pagination")}>
          {Array.from(Array(totalPages).keys()).map((pageNumber) => (
            <button
              className={cx("page_number")}
              style={{
                backgroundColor:
                  pageNumber + 1 === currentPage ? "bisque" : "#ffffff",
              }}
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
