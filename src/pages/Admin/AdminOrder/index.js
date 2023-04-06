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
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import styles from "./AdminOrder.module.scss";

const cx = classNames.bind(styles);

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

  async function deleteCategory(id) {
    try {
      await deleteDoc(doc(db, "orders", id));
      handleCloseDel();
      alert("delete success");
    } catch (error) {
      alert(error.message);
    }
  }

  function acceptOrder() {}

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>List of Orders</h2>

        <div className={cx("table")}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={cx("style-col")}>Orderer</TableCell>
                <TableCell className={cx("style-col")}>Phone</TableCell>
                <TableCell className={cx("style-col")}>Address</TableCell>
                <TableCell className={cx("style-col")}>Product</TableCell>
                <TableCell className={cx("style-col")}>Price</TableCell>
                <TableCell className={cx("style-col")}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.userName}</TableCell>
                  <TableCell>{data.userPhone}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.productName}</TableCell>
                  <TableCell>{data.productPrice}</TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        acceptOrder();
                      }}
                      variant="contained"
                      size="small"
                      sx={{
                        marginRight: 1,
                        backgroundColor: grey[500],
                        "&:hover": {
                          backgroundColor: grey[700],
                        },
                      }}
                    >
                      Accept
                    </Button>

                    <Button
                      onClick={handleOpenDel}
                      variant="contained"
                      size="small"
                      sx={{
                        backgroundColor: red[500],
                        "&:hover": {
                          backgroundColor: red[700],
                        },
                      }}
                    >
                      Cancel
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
                        Do you want to cancel this order?
                      </h4>
                      <DialogActions
                        style={{ display: "block", margin: "20px  auto" }}
                      >
                        <Button
                          onClick={() => {
                            deleteCategory(data.id);
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
                          Cancel
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

export default AdminOrder;
