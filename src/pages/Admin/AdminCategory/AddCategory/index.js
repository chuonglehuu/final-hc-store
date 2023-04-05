import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { Button, TextField } from "@mui/material";
import classNames from "classnames/bind";
import { useState } from "react";
import { addCategory } from "../../../../firebase/service";
import styles from "./AddCategory.module.scss";

const cx = classNames.bind(styles);
function AddCategory({setOpen}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      addCategory(name, description);
      setOpen(false);
      alert("Create new product successfully");
    } catch (error) {
      console.log(error);
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
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            sx={{ width: "80%", marginTop: "20px" }}
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
