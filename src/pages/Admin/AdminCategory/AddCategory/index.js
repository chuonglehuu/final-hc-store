import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { Button, TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import classNames from "classnames/bind";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../firebase/config";
import { addCategory } from "../../../../firebase/service";
import { toastMessage } from "../../../../utils/toast";
import styles from "./AddCategory.module.scss";

const cx = classNames.bind(styles);
function AddCategory({ setOpen }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = collection(db, "categories");
    const querySnapshot = await getDocs(
      query(docRef, where("name", "==", name))
    );
    if (!querySnapshot.empty) {
      return toastMessage("error", `Category with name '${name}' already exists.`);
    } else {
      try {
        addCategory(name, description);
        setOpen(false);
        toastMessage("success", "Create new category successfully");
      } catch (error) {
        toastMessage("error", error.message);
      }
    }
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Add New Category</h2>
        <form className={cx("form-add")} onSubmit={handleSubmit}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Category Name"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
            required
            autoFocus
          />

          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            style={{
              width: "80%",
              marginTop: "20px",
              resize: "none",
              padding: "6px",
            }}
            required
          />

          <Button
            sx={{ width: "80%", marginTop: 2 }}
            variant="contained"
            startIcon={<BookmarkAddedOutlinedIcon />}
            type="submit"
          >
            Save Category
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
