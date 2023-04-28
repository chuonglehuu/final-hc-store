import { Box, Grid } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
  const [listChatWithoutAdmin, setListChatWithAdmin] = useState([]);

  const onSelect = (userId) => {
    // khi select một conversation khác thì clean list messages hiện tại
    if (conversations.length && role === 0) {
      // convert sang string để so sánh dựa vào uid của user và uid của admin -> conversation
      const findConversation = conversations.find(
        (item) =>
          JSON.stringify(item.members) ===
          JSON.stringify([userId, "DpN1SsnTCXbAacR802db2dDCAv73"])
      );
      setConversationSelected(findConversation);
    }
  };

  const handleFetchMessages = async () => {
    // trường hợp là user: conversations chỉ có một phần tử chính là admin
    if (role !== 0) {
      // get data của conversation
      const conversationRef = doc(db, "conversations", conversations[0].id);
      const messagesRef = collection(conversationRef, "messages");
      const querySnapshot = await getDocs(messagesRef);
      let tempMessages = [];
      querySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });

      // docChanges với change type action -> api của firebase check xem mỗi lần
      // data được thêm mới vào một collection -> cụ thể là thêm mới vào messages
      onSnapshot(messagesRef, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const data = change.doc.data();
            // khi nhận được data mới, thì add new data vào list messages
            if (data.type === "text") {
              setMessages((pre) => [...pre, data]);
            }
          }
        });
      });
    }

    // trường hợp là admin: list conversations là danh sách các cuộc trò chuyện
    // đã có tin nhắn, khi nhắn tin phải dựa vào Id conversation selected
    if (role === 0) {
      const conversationRef = doc(db, "conversations", conversationSelected.id);
      const messagesRef = collection(conversationRef, "messages");
      const querySnapshot = await getDocs(messagesRef);
      let tempMessages = [];
      querySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });

      // api docChanges tương tự như ở trên
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
      setInputValue("");
    }
  };

  useEffect(() => {
    // get list users
    onSnapshot(collection(db, "users"), (snapshot) => {
      const listUsers = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // role = user -> thì chỉ lấy ra admin
      if (role === 2) {
        const filterAdmin = listUsers.filter((item) => item.role === 0);
        setUsersChat(filterAdmin);
      }

      // role = admin -> thì lấy ra list user
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

      // role = 2 -> conversation chỉ có một chính là user và admin
      if (role !== 0) {
        const filterConversationUserWithAdmin = listConversations.filter(
          (item) =>
            JSON.stringify(item.members) ===
            JSON.stringify([user.uid, "DpN1SsnTCXbAacR802db2dDCAv73"])
        );
        setConversations(filterConversationUserWithAdmin);
      }

      // role = 0 -> conversations là một mảng những conversation đã có tin nhắn
      if (role === 0) {
        // Lấy collection "messages" của mỗi conversation
        listConversations.forEach((conversation) => {
          const conversationRef = doc(db, "conversations", conversation.id);
          const messagesQuery = query(collection(conversationRef, "messages"));
          onSnapshot(messagesQuery, (messagesSnapshot) => {
            const messages = messagesSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            if (messages.length === 1) {
              setListChatWithAdmin([
                ...listChatWithoutAdmin,
                conversation.members[0],
              ]);
            }
            conversation.messages = messages;
          });
        });
        setConversations(listConversations);
      }
    });
  }, [role, userDetail]);

  useEffect(() => {
    setMessages([]);
    handleFetchMessages();
  }, [conversations, conversationSelected]);

  useEffect(() => {
    if (role !== 0) {
      // foramt lại message -> thêm vào mỗi object message một key senderName -> render UI
      // sau đó là sort tin nhắn
      const newMessages = messages
        .map((item) => {
          return {
            ...item,
            senderName:
              item.senderId === userDetail.uid ? userDetail?.fullname : "ADMIN",
          };
        })
        .sort((a, b) => {
          const dateA = new Date(
            a.timestamp.seconds * 1000 + a.timestamp.nanoseconds / 1000000
          );
          const dateB = new Date(
            b.timestamp.seconds * 1000 + b.timestamp.nanoseconds / 1000000
          );

          return dateA - dateB;
        });
      setMessagesFormat(newMessages);
    }
    if (role === 0) {
      const newMessages = messages
        .map((item) => {
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
        })
        .sort((a, b) => {
          const dateA = new Date(
            a.timestamp.seconds * 1000 + a.timestamp.nanoseconds / 1000000
          );
          const dateB = new Date(
            b.timestamp.seconds * 1000 + b.timestamp.nanoseconds / 1000000
          );

          return dateA - dateB;
        });
      setMessagesFormat(newMessages);
    }
  }, [role, userDetail, users, messages]);

  useEffect(() => {
    // logic lọc ra những user đã có tin nhắn với admin
    const newUsers = users.reduce((arr, current) => {
      if (!listChatWithoutAdmin.includes(current.uid)) {
        arr.push(current);
      }
      return arr;
    }, []);
    setUsersChat(newUsers);
  }, [listChatWithoutAdmin]);

  return (
    <div>
      <Helmet>
        <title>Chat</title>
        <meta name="description" content="" />
      </Helmet>
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
                    sx={{
                      border: "1px solid gray",
                      marginBottom: "8px",
                      borderRadius: "6px",
                    }}
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
                  style={{ width: "100%", resize: "none", padding: "6px" }}
                  onKeyDown={handleKeyDown}
                />
                <Box sx={{ mt: 1, ml: 2 }}>
                  <Button variant="contained" onClick={handleSendMessage}>
                    Gửi
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Chat;
