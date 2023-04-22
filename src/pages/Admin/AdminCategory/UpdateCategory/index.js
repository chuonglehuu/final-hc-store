import BookmarkAddedOutlinedIcon from "@mui/icons-material/BookmarkAddedOutlined";
import { Button, TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import classNames from "classnames/bind";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCategory } from "../../../../firebase/service";
import { toastMessage } from "../../../../utils/toast";
import styles from "../AddCategory/AddCategory.module.scss";

const cx = classNames.bind(styles);
function UpdateProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [name, setName] = useState("" || data.name);
  const [description, setDescription] = useState(data.description);

  const update = async (id, name, description) => {
    try {
      await updateCategory(id, name, description);
      navigate("/manager/categories");
      toastMessage("success", "Update category successfully");
    } catch (error) {
      toastMessage("error", error.message);
    }
  };

  return (
    <div className={cx("main")}>
      <div className={cx("content")}>
        <h2 className={cx("title")}>Update Product</h2>
        <form className={cx("form-add")}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="outlined-basic"
            label="Product Name"
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
            onClick={() => {
              update(data.id, name, description);
            }}
          >
            Save Product
          </Button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;
