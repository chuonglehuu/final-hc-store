import CategoryIcon from "@mui/icons-material/Category";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { green } from "@mui/material/colors";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../../context/AuthContext";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);
function Sidebar() {
  const navigate = useNavigate();
  const { role } = UserAuth();

  const managerItems = [
    {
      text: "Dashboard",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/manager/dashboard",
    },
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
    {
      text: "Orders",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/manager/orders",
    },
  ];

  const adminItems = [
    {
      text: "Dashboard",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/admin/dashboard",
    },
    {
      text: "Users",
      icon: <CategoryIcon sx={{ color: green[500] }} />,
      path: "/admin",
    },
  ];
  return (
    <nav>
      <div className={cx("main")}>
        <div className={cx("content")}>
          <List>
            {(role === 0 ? adminItems : managerItems).map((item, index) => (
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
