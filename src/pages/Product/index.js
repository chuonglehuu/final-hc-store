import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

const ITEMS_PER_PAGE = 4;

const ProductPrice = styled(Typography)({
  fontWeight: "bold",
  fontSize: "15px",
});

const OldPrice = styled(Typography)({
  fontSize: "12px",
  marginLeft: "12px",
  fontStyle: "italic",
  color: "gray",
  textDecoration: "line-through",
});

function Product() {
  const navigate = useNavigate();
  const { productsContext } = UserAuth();
  const productStorage = localStorage.getItem("products");

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("All");
  const [categories, setCategories] = useState([]);
  const [sortProducts, setSortProducts] = useState([]);

  const totalPages = Math.ceil(sortProducts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    if (productStorage) {
      if (filter === "All") {
        return setSortProducts(JSON.parse(productStorage));
      }
      if (filter !== "All") {
        const newArr = JSON.parse(productStorage).filter(
          (item) => item.type === filter
        );
        return setSortProducts(newArr);
      }
    }

    if (productsContext) {
      if (filter === "All") {
        return setSortProducts(productsContext);
      }
      if (filter !== "All") {
        const newArr = productsContext.filter((item) => item.type === filter);
        return setSortProducts(newArr);
      }
    }
  }, [productsContext, filter, productStorage]);

  return (
    <div>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="" />
      </Helmet>
      <FormControl sx={{ width: "200px", marginTop: "12px" }}>
        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter by"
          onChange={(e) => setFilter(e.target.value)}
        >
          {[{ name: "All", id: "all-id" }].concat(categories).map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={cx("main")}>
        {sortProducts
          .slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
          )
          .map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "stretch",
                maxWidth: 540,
                height: 340,
                marginBottom: "24px",
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                  cursor: "pointer",
                },
                padding: "6px",
              }}
              style={{ border: "1px solid #999" }}
              onClick={() => {
                const filterProducts = productsContext
                  .filter(
                    (product) =>
                      product.id !== item.id && product.type === item.type
                  )
                  .slice(0, 2);
                navigate("/product/detail", {
                  state: { item: item, productsSimilar: filterProducts },
                });
              }}
            >
              <div style={{ flex: 1 }}>
                <CardMedia
                  sx={{
                    height: { xs: 140, md: "100%" },
                    maxHeight: { xs: 140, md: "100%" },
                    width: { xs: "100%", md: "auto" },
                  }}
                  image={item.url_img}
                  title="Product image"
                />
              </div>
              <div style={{ flex: 1 }}>
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "16px",
                  }}
                >
                  <div className={cx("name")}>{item.name}</div>
                  <Typography variant="body2" color="text.secondary">
                    <span>Category: {item.type}</span>
                  </Typography>
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ProductPrice variant="h6">
                      {Number(item.new_price).toLocaleString("en-US")} VNĐ
                    </ProductPrice>
                    <OldPrice>
                      {Number(item.old_price).toLocaleString("en-US")} VNĐ
                    </OldPrice>
                  </Grid>
                  <div className={cx("description")}>{item.description}</div>
                </CardContent>
              </div>
            </Card>
          ))}
        <div className={cx("pagination")}>
          {Array.from(Array(totalPages).keys()).map((pageNumber) => (
            <button
              className={cx("page_number")}
              style={{
                backgroundColor:
                  pageNumber + 1 === currentPage ? "#1cbfda" : "#ffffff",
              }}
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
