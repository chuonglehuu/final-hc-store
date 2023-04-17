import { Box, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { addMessage } from "../../firebase/service";

function Chat() {
  const { userDetail, role, user } = UserAuth();

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [users, setUsersChat] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversationSelected, setConversationSelected] = useState(null);
  const [messagesFormat, setMessagesFormat] = useState([]);

  const onSelect = (userId) => {
    if (conversations.length && role === 0) {
      const findConversation = conversations.find(
        (item) =>
          JSON.stringify(item.members) ===
          JSON.stringify([userId, "DpN1SsnTCXbAacR802db2dDCAv73"])
      );
      setConversationSelected(findConversation);
    }
  };

  const handleFetchMessages = async () => {
    if (role !== 0) {
      const conversationRef = doc(db, "conversations", conversations[0].id);
      const messagesRef = collection(conversationRef, "messages");
      const querySnapshot = await getDocs(messagesRef);
      let tempMessages = [];
      querySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });

      onSnapshot(messagesRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            // let exists = messages.some((item) => item.id === data.id);
            if (data.type === "text") {
              setMessages((pre) => [...pre, data]);
            }
          }
        });
      });
    }

    if (role === 0) {
      const conversationRef = doc(db, "conversations", conversationSelected.id);
      const messagesRef = collection(conversationRef, "messages");
      const querySnapshot = await getDocs(messagesRef);
      let tempMessages = [];
      querySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });

      onSnapshot(messagesRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            // let exists = messages.some((item) => item.id === data.id);
            if (data.type === "text") {
              setMessages((pre) => [...pre, data]);
            }
          }
        });
      });
    }
  };

  const handleSendMessage = async () => {
    if (role !== 0 && inputValue) {
      await addMessage(conversations[0].id, user.uid, inputValue);
    }

    if (conversationSelected && role === 0 && inputValue) {
      await addMessage(conversationSelected.id, user.uid, inputValue);
    }

    setInputValue("");
  };

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      const listUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      if (role === 2) {
        const filterAdmin = listUsers.filter((item) => item.role === 0);
        setUsersChat(filterAdmin);
      }

      if (role === 0) {
        const filterUsers = listUsers.filter((item) => item.role === 2);
        setUsersChat(filterUsers);
      }
    });

    onSnapshot(collection(db, "conversations"), (snapshot) => {
      const listConversations = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      if (role !== 0) {
        const filterConversationUserWithAdmin = listConversations.filter(
          (item) =>
            JSON.stringify(item.members) ===
            JSON.stringify([user.uid, "DpN1SsnTCXbAacR802db2dDCAv73"])
        );
        setConversations(filterConversationUserWithAdmin);
      }

      if (role === 0) setConversations(listConversations);
    });
  }, [role, userDetail]);

  useEffect(() => {
    handleFetchMessages();
  }, [conversations, conversationSelected]);

  useEffect(() => {
    if (role !== 0) {
      const newMessages = messages.map((item) => {
        return {
          ...item,
          senderName:
            item.senderId === userDetail.uid ? userDetail?.fullname : "ADMIN",
        };
      });
      setMessagesFormat(newMessages);
    }
    if (role === 0) {
      const newMessages = messages.map((item) => {
        if (userDetail.uid === item.senderId) {
          return {
            ...item,
            senderName: "ADMIN",
          };
        } else {
          const findUser = users.find((user) => user.uid === item.senderId);
          return {
            ...item,
            senderName: findUser?.fullname || "NULL",
          };
        }
      });
      setMessagesFormat(newMessages);
    }
  }, [role, userDetail, users, messages]);

  return (
    <Box sx={{ height: "92vh", flexGrow: 1, marginTop: "2px" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ height: "100%", bgcolor: "#f5f5f5" }}>
            <List sx={{ height: "100%" }}>
              {users.map((user) => (
                <ListItem
                  button
                  key={user.uid}
                  onClick={() => onSelect(user.uid)}
                >
                  <ListItemAvatar>
                    <Avatar alt="User 1" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText primary={user?.fullname} />
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
              {messagesFormat.map((message, index) => (
                <div key={message.id}>
                  <strong>{message.senderName}</strong>: {message.text}
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
