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
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase/config";
import { toastMessage } from "../../../utils/toast";
import AddCategory from "./AddCategory";
import styles from "./AdminCategory.module.scss";

const cx = classNames.bind(styles);

function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [del, setDel] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [typeDelete, setTypeDelete] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  function handleOpenAdd() {
    setOpen(true);
  }

  function handleCloseAdd() {
    setOpen(false);
  }

  function handleOpenDel(id, type) {
    setIdDelete(id);
    setTypeDelete(type);
    setDel(true);
  }
  function handleCloseDel() {
    setDel(false);
  }

  async function deleteCategory() {
    if (idDelete) {
      try {
        const productsRef = collection(db, "products");
        const querySnapshot = await getDocs(
          query(productsRef, where("type", "==", typeDelete))
        );
        if (!querySnapshot.empty) {
          toastMessage("error", "This category cannot be deleted");
        } else {
          await deleteDoc(doc(db, "categories", idDelete));
          handleCloseDel();
          toastMessage("success", "Delete success");
        }
      } catch (error) {
        toastMessage("error", error.message);
      }
    }
  }

  function updateCategory(id, name, description) {
    navigate("/manager/update-category", {
      state: {
        id: id,
        name: name,
        description: description,
      },
    });
  }

  return (
    <div>
      <Helmet>
        <title>Category Manager</title>
        <meta name="description" content="" />
      </Helmet>
      <div className={cx("main")}>
        <div className={cx("content")}>
          <h2 className={cx("title")}>List of Categories</h2>
          <div className={cx("add-btn")}>
            <Button
              variant="contained"
              startIcon={<ControlPointOutlinedIcon />}
              onClick={() => {
                handleOpenAdd();
              }}
            >
              Add Category
            </Button>
            <Dialog
              open={open}
              onClose={() => {
                handleCloseAdd();
              }}
            >
              <AddCategory setOpen={setOpen} />
            </Dialog>
          </div>
          <div className={cx("table")}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={cx("style-col")}>Name</TableCell>
                  <TableCell className={cx("style-col")}>Description</TableCell>
                  <TableCell className={cx("style-col")}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ maxWidth: "200px" }}>
                      <div className={cx("style-display")}>{data.name}</div>
                    </TableCell>
                    <TableCell style={{ maxWidth: "300px" }}>
                      <div className={cx("style-display")}>
                        {data.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          updateCategory(data.id, data.name, data.description);
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
                        onClick={() => handleOpenDel(data.id, data.name)}
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
                          Do you want to delete this category?
                        </h4>
                        <DialogActions
                          style={{ display: "block", margin: "20px  auto" }}
                        >
                          <Button
                            onClick={() => {
                              deleteCategory();
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

export default AdminCategory;
