import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
import { red } from "@mui/material/colors";
import classNames from "classnames/bind";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/config";
import AddManager from "./AddManager";
import styles from "./AdminUser.module.scss";

const cx = classNames.bind(styles);

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const listUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filterAdminUser = listUsers.filter((item) => item.role !== 0);
      setUsers(filterAdminUser);
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

  async function deleteUser(id) {
    try {
      await deleteDoc(doc(db, "users", id));
      handleCloseDel();
      alert("delete success");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>List of users</h2>
        <div className={cx("add-btn")}>
          <Button
            variant="contained"
            startIcon={<ControlPointOutlinedIcon />}
            onClick={() => {
              handleOpenAdd();
            }}
          >
            Create new manager
          </Button>
          <Dialog
            open={open}
            onClose={() => {
              handleCloseAdd();
            }}
          >
            <AddManager setOpen={setOpen} />
          </Dialog>
        </div>
        <div className={cx("table")}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={cx("style-col")}>Name</TableCell>
                <TableCell className={cx("style-col")}>Role</TableCell>
                <TableCell className={cx("style-col")}>Email</TableCell>
                <TableCell className={cx("style-col")}>Phone Number</TableCell>
                <TableCell className={cx("style-col")}>Address</TableCell>
                <TableCell className={cx("style-col")}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.fullname}</TableCell>
                  <TableCell>{data.role === 1 ? "Manager" : "User"}</TableCell>
                  <TableCell>{data.email}</TableCell>
                  <TableCell>{data.phone}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>
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
                        Do you want to delete this user?
                      </h4>
                      <DialogActions
                        style={{ display: "block", margin: "20px  auto" }}
                      >
                        <Button
                          onClick={() => {
                            deleteUser(data.id);
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

export default AdminUser;
