import { Box, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

function Chat() {
  const { userDetail, role } = UserAuth();

  const [messages, setMessages] = useState([
    { id: "1", sender: "ADMIN", text: "1" },
    { id: "2", sender: "ADMIN", text: "1" },
    { id: "3", sender: "ADMIN", text: "1" },
    { id: "4", sender: "ADMIN", text: "1" },
    { id: "5", sender: "ADMIN", text: "1" },
    { id: "6", sender: "Hieu Lv", text: "2" },
    { id: "7", sender: "Hieu Lv", text: "2" },
    { id: "8", sender: "Hieu Lv", text: "2" },
    { id: "9", sender: "Hieu Lv", text: "2" },
    { id: "10", sender: "Hieu Lv", text: "2" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsersChat] = useState([]);

  const handleSendMessage = () => {};

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const listUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (role === 2 && userDetail.role === 2) {
        const filterAdmin = listUsers.filter((item) => item.role === 0);
        setUsersChat(filterAdmin);
      }

      if (role === 0 && userDetail.role === 0) {
        const filterUsers = listUsers.filter((item) => item.role === 2);
        setUsersChat(filterUsers);
      }
    });
  }, [role, userDetail]);

  return (
    <Box sx={{ height: "92vh", flexGrow: 1, marginTop: "2px" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ height: "100%", bgcolor: "#f5f5f5" }}>
            <List sx={{ height: "100%" }}>
              {users.map((user) => (
                <ListItem button key={user.uid}>
                  <ListItemAvatar>
                    <Avatar alt="User 1" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText primary={user.fullname} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ height: "90vh", bgcolor: "#fff" }}>
            {/* Đoạn chat */}
            <Box
              sx={{ p: 2, height: "calc(100% - 76px)", overflowY: "scroll" }}
            >
              {messages.map((message, index) => (
                <div key={message.id}>
                  <strong>{message.sender}</strong>: {message.text}
                </div>
              ))}
            </Box>
            {/* Ô input */}
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Nhập tin nhắn của bạn..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                style={{ width: "100%", resize: "none" }}
              />
              <Box sx={{ mt: 1 }}>
                <Button variant="contained" onClick={handleSendMessage}>
                  Gửi
                </Button>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
