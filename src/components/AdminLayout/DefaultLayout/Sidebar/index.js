import CategoryIcon from "@mui/icons-material/Category";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { green } from "@mui/material/colors";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);
function Sidebar() {
  const navigate = useNavigate();
  const menuItems = [
    {
      text: "Products",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/manager",
    },
    {
      text: "Categories",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/manager/categories",
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