import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { grey, red } from "@mui/material/colors";
import classNames from "classnames/bind";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import styles from "./AdminOrder.module.scss";

const cx = classNames.bind(styles);

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    onSnapshot(collection(db, "orders"), (snapshot) => {
      const listOrders = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (filter === "all") setOrders(listOrders);

      if (filter === "pending") {
        const newArr = listOrders.filter((item) => item.status === "pending");
        setOrders(newArr);
      }

      if (filter === "accepted") {
        const newArr = listOrders.filter((item) => item.status === "accepted");
        setOrders(newArr);
      }

      if (filter === "canceled") {
        const newArr = listOrders.filter((item) => item.status === "canceled");
        setOrders(newArr);
      }
    });
  }, [filter]);

  async function acceptOrder(id) {
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, {
      status: "accepted",
    });
  }

  async function cancelOrder(id) {
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, {
      status: "canceled",
    });
  }

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>List of Orders</h2>

        <FormControl sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Filter by"
            onChange={(e) => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="accepted">Accepted</MenuItem>
            <MenuItem value="canceled">canceled</MenuItem>
          </Select>
        </FormControl>

        <div className={cx("table")}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={cx("style-col")}>Orderer</TableCell>
                <TableCell className={cx("style-col")}>Phone</TableCell>
                <TableCell className={cx("style-col")}>Address</TableCell>
                <TableCell className={cx("style-col")}>Product</TableCell>
                <TableCell className={cx("style-col")}>Price</TableCell>
                <TableCell className={cx("style-col")}>Status</TableCell>
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
                  <TableCell>{data.status}</TableCell>
                  {data.status === "pending" && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          acceptOrder(data.id);
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
                        onClick={() => {
                          cancelOrder(data.id);
                        }}
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
                    </TableCell>
                  )}
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
