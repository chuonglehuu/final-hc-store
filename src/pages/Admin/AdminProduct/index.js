import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import classNames from "classnames/bind";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import { toastMessage } from "../../../utils/toast";
import AddProduct from "./AddProduct";
import styles from "./AdminProduct.module.scss";

const cx = classNames.bind(styles);

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [idDelete, setIdDelete] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, "products"), (snapshot) => {
      setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  }, []);

  function handleOpenAdd() {
    setOpen(true);
  }
  function handleCloseAdd() {
    setOpen(false);
  }
  function handleOpenDel(id) {
    setIdDelete(id);
    setDel(true);
  }
  function handleCloseDel() {
    setDel(false);
    setIdDelete("");
  }

  async function deleteProduct() {
    if (idDelete) {
      try {
        await deleteDoc(doc(db, "products", idDelete));
        handleCloseDel();
        toastMessage("success", "delete success");
      } catch (error) {
        toastMessage("error", error.message);
      }
    }
  }

  function navigateUpdateProductPage(
    id,
    name,
    type,
    desc,
    price,
    promo,
    new_price
  ) {
    navigate("/manager/update-product", {
      state: {
        id: id,
        name: name,
        type: type,
        desc: desc,
        price: price,
        promo: promo,
        new_price: new_price,
      },
    });
  }

  return (
    <div>
      <Helmet>
        <title>Product Manager</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={cx("main")}>
        <div className={cx("content")}>
          <h2 className={cx("title")}>List of Products</h2>
          <div className={cx("add-btn")}>
            <Button
              variant="contained"
              startIcon={<ControlPointOutlinedIcon />}
              onClick={() => {
                handleOpenAdd();
              }}
            >
              Add Product
            </Button>
            <Dialog
              open={open}
              onClose={() => {
                handleCloseAdd();
              }}
            >
              <AddProduct setOpen={setOpen} />
            </Dialog>
          </div>
          <div className={cx("table")}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={cx("style-col")}>Name</TableCell>
                  <TableCell className={cx("style-col")}>Type</TableCell>
                  <TableCell className={cx("style-col")}>Description</TableCell>
                  <TableCell className={cx("style-col")}>Price (VND)</TableCell>
                  <TableCell className={cx("style-col")}>Promo (%)</TableCell>
                  <TableCell className={cx("style-col")}>
                    Currrent Price (VND)
                  </TableCell>
                  <TableCell className={cx("style-col")}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ maxWidth: "200px" }}>
                      <div className={cx("style-display")}>{data.name}</div>
                    </TableCell>
                    <TableCell>{data.type}</TableCell>
                    <TableCell style={{ maxWidth: "300px" }}>
                      <div className={cx("style-display")}>
                        {data.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      {Number(data.old_price).toLocaleString("en-US")}
                    </TableCell>
                    <TableCell>{data.promotion}</TableCell>
                    <TableCell>
                      {Number(data.new_price).toLocaleString("en-US")}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          navigateUpdateProductPage(
                            data.id,
                            data.name,
                            data.type,
                            data.description,
                            data.old_price,
                            data.promotion,
                            data.new_price
                          );
                        }}
                        variant="contained"
                        startIcon={<ModeEditOutlineOutlinedIcon />}
                        size="small"
                        sx={{
                          marginRight: 1,
                          marginTop: "6px",
                          backgroundColor: grey[500],
                          "&:hover": {
                            backgroundColor: grey[700],
                          },
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => handleOpenDel(data.id)}
                        variant="contained"
                        startIcon={<DeleteOutlineOutlinedIcon />}
                        size="small"
                        sx={{
                          backgroundColor: red[500],
                          marginTop: "6px",
                          "&:hover": {
                            backgroundColor: red[700],
                          },
                        }}
                      >
                        Delete
                      </Button>
                      <Dialog
                        open={del}
                        onClose={handleCloseDel}
                        style={{ height: "500px" }}
                      >
                        <h4
                          style={{
                            width: "400px",
                            height: "50px",
                            fontSize: "22px",
                            textAlign: "center",
                            lineHeight: "50px",
                          }}
                        >
                          Do you want to delete this product?
                        </h4>
                        <DialogActions
                          style={{ display: "block", margin: "20px  auto" }}
                        >
                          <Button
                            onClick={() => {
                              deleteProduct();
                            }}
                            variant="contained"
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            size="small"
                            sx={{
                              backgroundColor: red[500],
                              "&:hover": {
                                backgroundColor: red[700],
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
