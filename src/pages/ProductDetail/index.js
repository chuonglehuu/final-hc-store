import { Dialog } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import classNames from "classnames/bind";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import ConfirmAddress from "../Product/ConfirmAddress";
import styles from "./ProductDetail.module.scss";

const cx = classNames.bind(styles);

const ProductImage = styled("img")({
  width: "100%",
  height: "auto",
  border: "1px solid #ccc",
});

const ProductDetails = styled("div")({
  padding: "16px",
});

const ProductName = styled(Typography)({
  fontWeight: "bold",
  marginBottom: "8px",
});

const ProductCategory = styled(Typography)({
  color: "gray",
  marginBottom: "8px",
});

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

const ProductDetail = () => {
  const location = useLocation();
  const { user, userDetail, role } = UserAuth();

  const [openConfirmAddress, setOpenConfirmAddress] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [userNameBuy, setUserNameBuy] = useState("");
  const [productNameBuy, setProductNameBuy] = useState("");
  const [productPriceBuy, setProductPriceBuy] = useState();

  const navigate = useNavigate();

  const product = location.state.item;
  const productsSimilar = location.state.productsSimilar;

  const handleOpenConfirmAddress = (
    emailUser,
    userName,
    productName,
    productPrice
  ) => {
    setOpenConfirmAddress(true);
    setEmailUser(emailUser);
    setUserNameBuy(userName);
    setProductNameBuy(productName);
    setProductPriceBuy(productPrice);
  };

  function handleCloseAdd() {
    setOpenConfirmAddress(false);
  }

  return (
    <div>
      <Helmet>
        <title>Product Detail</title>
        <meta name="description" content="" />
      </Helmet>
      <Box sx={{ display: "flex", marginTop: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProductImage src={product.url_img} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductDetails>
              <ProductName variant="h5">{product.name}</ProductName>
              <ProductCategory variant="body1">
                <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                {product.type}
              </ProductCategory>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ProductPrice variant="h6">
                  {Number(product.new_price).toLocaleString("en-US")} VNĐ
                </ProductPrice>
                <OldPrice>
                  {Number(product.old_price).toLocaleString("en-US")} VNĐ
                </OldPrice>
              </Grid>
              {(role === 2 || userDetail.role === 2) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (user && user.providerData.length) {
                      handleOpenConfirmAddress(
                        user.providerData[0].email || userDetail.email || "",
                        user.providerData[0].displayName ||
                          userDetail.fullname ||
                          "",
                        product.name,
                        product.new_price
                      );
                    }
                  }}
                >
                  Buy
                </Button>
              )}
            </ProductDetails>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h4">Other Information</Typography>
            <Typography variant="body1">{product.description}</Typography>
          </Grid>

          <Grid container spacing={2} mt={4} sx={{ paddingLeft: "16px" }}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Similar products
              </Typography>
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginLeft: "12px",
              }}
            >
              {productsSimilar.map((ele) => (
                <Card
                  key={ele.id}
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
                      state: ele,
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
                    image={ele.url_img}
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
                    <div className={cx("name")}>{ele.name}</div>
                    <Typography variant="body2" color="text.secondary">
                      <span>Category: {ele.type}</span>
                    </Typography>
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <ProductPrice variant="h6">
                        {Number(ele.new_price).toLocaleString("en-US")} VNĐ
                      </ProductPrice>
                      <OldPrice>
                        {Number(ele.old_price).toLocaleString("en-US")} VNĐ
                      </OldPrice>
                    </Grid>
                    <div className={cx("description")}>{ele.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={openConfirmAddress}
          onClose={() => {
            handleCloseAdd();
          }}
        >
          <ConfirmAddress
            setOpen={setOpenConfirmAddress}
            emailUser={emailUser}
            userName={userNameBuy}
            productName={productNameBuy}
            productPrice={productPriceBuy}
          />
        </Dialog>
      </Box>
    </div>
  );
};

export default ProductDetail;
