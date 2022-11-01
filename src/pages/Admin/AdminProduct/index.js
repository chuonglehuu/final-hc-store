import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { red, grey } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

import styles from "./AdminProduct.module.scss";
import { db } from "../../../firebase/config";
import UpdateProduct from "./UpdateProduct";
import AddProduct from "./AddProduct";

const cx = classNames.bind(styles);

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [update, setUpdate] = useState(false);
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
  function handleOpenDel() {
    setDel(true);
  }
  function handleCloseDel() {
    setDel(false);
  }

  async function deleteProduct(id) {
    try {
      await deleteDoc(doc(db, "products", id));
      await handleCloseDel();
      alert("delete success");
    } catch (error) {
      alert(error.message);
    }
  }

  function updateProduct(id, name, type, desc, price, promo, new_price) {
    navigate("/admin/product/update-product", {
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
            <AddProduct />
          </Dialog>
        </div>
        <div className={cx("table")}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={cx("style-col")}>Id</TableCell>
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.type}</TableCell>
                  <TableCell className={cx("style-display")}>
                    {data.description}
                  </TableCell>
                  <TableCell>{data.old_price}</TableCell>
                  <TableCell sx={{ width: "10px" }}>{data.promotion}</TableCell>
                  <TableCell>{data.new_price}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        updateProduct(
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
                        backgroundColor: grey[500],
                        "&:hover": {
                          backgroundColor: grey[700],
                        },
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={handleOpenDel}
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
                            deleteProduct(data.id);
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
  );
}

export default AdminProduct;
