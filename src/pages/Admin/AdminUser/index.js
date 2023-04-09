import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import {
  Button,
  Dialog,
  DialogActions,
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
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import AddManager from "./AddManager";
import styles from "./AdminUser.module.scss";

const cx = classNames.bind(styles);

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [filter, setFilter] = useState(0);
  const [idDelete, setIdDelete] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const listUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const filterAdminUser = listUsers.filter((item) => item.role !== 0);
      if (filter === 0) {
        setUsers(filterAdminUser);
      }
      if (filter === 1) {
        const newArr = listUsers.filter((item) => item.role === 1);
        setUsers(newArr);
      }
      if (filter === 2) {
        const newArr = listUsers.filter((item) => item.role === 2);
        setUsers(newArr);
      }
    });
  }, [filter]);

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
  }

  async function deleteUser() {
    if (idDelete) {
      try {
        await deleteDoc(doc(db, "users", idDelete));
        handleCloseDel();
        alert("delete success");
      } catch (error) {
        alert(error.message);
      }
    }
  }

  function updateUser(id, name, phone, address) {
    navigate("/admin/update-manager", {
      state: {
        id: id,
        name: name,
        phone: phone,
        address: address,
      },
    });
  }

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>List of users</h2>
        <div className={cx("action-button-filter")}>
          <FormControl sx={{ width: "200px" }}>
            <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={filter}
              label="Filter by"
              onChange={(e) => setFilter(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={1}>Manager</MenuItem>
              <MenuItem value={2}>User</MenuItem>
            </Select>
          </FormControl>
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
                    {data.role === 1 && (
                      <Button
                        onClick={() => {
                          updateUser(
                            data.id,
                            data.fullname,
                            data.phone,
                            data.address
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
                    )}

                    <Button
                      onClick={() => handleOpenDel(data.id)}
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
                            deleteUser();
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
