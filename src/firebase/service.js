import {
  Timestamp,
  addDoc,
  collection,
  doc,
  runTransaction,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./config";

export const addProduct = async (
  name,
  category,
  des,
  price,
  promo,
  currentPrice,
  image
) => {
  const docRef = collection(db, "products");
  const imgRef = ref(storage, `products/${image.name}`);
  await addDoc(docRef, {
    name: name,
    type: category,
    description: des,
    old_price: price.toString(),
    promotion: promo.toString(),
    new_price: currentPrice.toString(),
    url_img: image.name,
    create_at: Timestamp.fromDate(new Date()),
  });
  await uploadBytes(imgRef, image);
  console.log(ref(storage, `products/${image.name}`));
};

export const updateProduct = async (
  id,
  name,
  category,
  desc,
  price,
  promo,
  currentPrice
) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, {
    name: name,
    type: category,
    description: desc,
    old_price: price.toString(),
    promotion: promo.toString(),
    new_price: currentPrice.toString(),
    update_at: Timestamp.fromDate(new Date()),
  });
};

export const addCategory = async (name, description) => {
  const docRef = collection(db, "categories");
  await addDoc(docRef, {
    name: name,
    description: description,
    create_at: Timestamp.fromDate(new Date()),
  });
};

export const updateCategory = async (id, name, description) => {
  const docRef = doc(db, "categories", id);
  await updateDoc(docRef, {
    name: name,
    description: description,
    update_at: Timestamp.fromDate(new Date()),
  });
};

export const addManager = async (name, email, phone, address, uid) => {
  const docRef = collection(db, "users");
  await addDoc(docRef, {
    fullname: name,
    email: email,
    phone: phone,
    address: address,
    create_at: Timestamp.fromDate(new Date()),
    uid: uid,
    role: 1,
  });
};

export const updateManager = async (id, name, phone, address) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, {
    fullname: name,
    phone: phone,
    address: address,
    update_at: Timestamp.fromDate(new Date()),
  });
};

export const addOrder = async (
  emailUser,
  userName,
  userPhone,
  address,
  productName,
  productPrice
) => {
  const docRef = collection(db, "orders");
  await addDoc(docRef, {
    emailUser: emailUser,
    userName: userName,
    userPhone: userPhone,
    address: address,
    productName: productName,
    productPrice: productPrice,
    create_at: Timestamp.fromDate(new Date()),
    status: "Pending",
  });
};

export const createConversation = async (members, senderId) => {
  const conversationsRef = collection(db, "conversations");

  await runTransaction(db, async (transaction) => {
    // Tạo document mới trong collection conversations
    const newConversationRef = await addDoc(conversationsRef, {
      members: members,
      createAt: Timestamp.fromDate(new Date()),
    });

    // Tạo collection messages trong document mới được tạo
    const messagesRef = collection(newConversationRef, "messages");

    // Thêm document mới vào collection messages
    await addDoc(messagesRef, {
      text: "Created contact with ADMIN",
      senderId: senderId,
      timestamp: Timestamp.fromDate(new Date()),
      type: "notify",
    });
  });
};

export const addMessage = async (conversationId, senderId, text) => {
  const conversationRef = doc(db, "conversations", conversationId);
  const messagesRef = collection(conversationRef, "messages");
  await addDoc(messagesRef, {
    text: text,
    senderId: senderId,
    timestamp: Timestamp.fromDate(new Date()),
    type: "text",
  });
};
