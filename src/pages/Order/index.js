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
import { grey } from "@mui/material/colors";
import classNames from "classnames/bind";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { toastMessage } from "../../utils/toast";
import styles from "./Order.module.scss";

const cx = classNames.bind(styles);

function Order() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(collection(db, "orders"), (snapshot) => {
      const listOrders = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filterOrders = listOrders.filter(
        (item) => item.emailUser === user.email
      );

      if (filter === "All") setOrders(filterOrders);

      if (filter === "Pending") {
        const newArr = filterOrders.filter((item) => item.status === "Pending");
        setOrders(newArr);
      }

      if (filter === "Accepted") {
        const newArr = filterOrders.filter(
          (item) => item.status === "Accepted"
        );
        setOrders(newArr);
      }

      if (filter === "Canceled") {
        const newArr = filterOrders.filter(
          (item) => item.status === "Canceled"
        );
        setOrders(newArr);
      }
      if (filter === "Received") {
        const newArr = filterOrders.filter(
          (item) => item.status === "Received"
        );
        setOrders(newArr);
      }
    });
  }, [filter]);

  async function acceptOrder(id) {
    const docRef = doc(db, "orders", id);
    try {
      await updateDoc(docRef, {
        status: "Received",
      });
      toastMessage("success", "Received");
    } catch (error) {
      toastMessage("error", "Failed");
    }
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
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Canceled">Canceled</MenuItem>
            <MenuItem value="Received">Success</MenuItem>
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
                  <TableCell style={{ maxWidth: "300px" }}>
                    <div className={cx("style-display")}>
                      {data.productName}
                    </div>
                  </TableCell>
                  <TableCell>
                    {Number(data.productPrice).toLocaleString("en-US")}
                  </TableCell>
                  <TableCell>{data.status}</TableCell>
                  {data.status === "Accepted" && (
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
                        Received
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

export default Order;
