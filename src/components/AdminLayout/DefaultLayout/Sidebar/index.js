import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CategoryIcon from "@mui/icons-material/Category";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    {
      text: "Product",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/admin/product",
    },
  ];
  return (
    <nav>
      <div className={cx("main")}>
        <div className={cx("content")}>
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
