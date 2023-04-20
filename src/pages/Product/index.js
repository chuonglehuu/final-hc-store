import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../../firebase/config";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

const ITEMS_PER_PAGE = 4;

const ProductPrice = styled(Typography)({
  fontWeight: "bold",
  fontSize: "16px",
});

const OldPrice = styled(Typography)({
  fontSize: "12px",
  marginLeft: "24px",
  fontStyle: "italic",
  color: "gray",
  textDecoration: "line-through",
});

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
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "stretch",
                maxWidth: 540,
                height: 340,
                marginBottom: "24px",
                ":hover": {
                  boxShadow: 20, // theme.shadows[20]
                  cursor: "pointer",
                },
                padding: "12px",
              }}
              style={{ border: "1px solid #999" }}
              onClick={() =>
                navigate("/product/detail", {
                  state: item,
                })
              }
            >
              <CardMedia
                sx={{
                  flex: { xs: "none", md: "5 0 0" },
                  height: { xs: 140, md: "100%" },
                  maxHeight: { xs: 140, md: "100%" },
                  width: { xs: "100%", md: "auto" },
                }}
                image={item.url_img}
                title="Product image"
              />
              <CardContent
                sx={{
                  flex: "5 0 0",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "16px",
                }}
              >
                <div>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>{item.category}</span>
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: "50%",
                      overflow: "hidden",
                      marginTop: "6px",
                    }}
                  >
                    <span>{item.description}</span>
                  </Typography>
                </div>
              </CardContent>
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
    </>
  );
}

export default Product;
