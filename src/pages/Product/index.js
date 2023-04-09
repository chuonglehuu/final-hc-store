import {
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db, storage } from "../../firebase/config";
import ConfirmAddress from "./ConfirmAddress";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

const ITEMS_PER_PAGE = 6;

function Product() {
  const { role, user } = UserAuth();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openConfirmAddress, setOpenConfirmAddress] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [userNameBuy, setUserNameBuy] = useState("");
  const [productNameBuy, setProductNameBuy] = useState("");
  const [productPriceBuy, setProductPriceBuy] = useState();
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

  const handleOpenConfirmAddress = (
    id,
    userName,
    userPhone,
    productName,
    productPrice
  ) => {
    setOpenConfirmAddress(true);
    setIdUser(id);
    setUserNameBuy(userName);
    setProductNameBuy(productName);
    setProductPriceBuy(productPrice);
  };

  function handleCloseAdd() {
    setOpenConfirmAddress(false);
  }

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
              {role === 2 && (
                <>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        if (user && user.providerData.length) {
                          handleOpenConfirmAddress(
                            item.id,
                            user.providerData[0].displayName || "",
                            user.providerData[0].phoneNumber || "",
                            item.name,
                            item.new_price
                          );
                        }
                      }}
                      sx={{
                        ":hover": {
                          cursor: "pointer",
                          backgroundColor: " #b3ffe0",
                        },
                      }}
                    >
                      Buy
                    </Button>
                  </CardActions>
                </>
              )}
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
        <Dialog
          open={openConfirmAddress}
          onClose={() => {
            handleCloseAdd();
          }}
        >
          <ConfirmAddress
            setOpen={setOpenConfirmAddress}
            id={idUser}
            userName={userNameBuy}
            productName={productNameBuy}
            productPrice={productPriceBuy}
          />
        </Dialog>
      </div>
    </>
  );
}

export default Product;
