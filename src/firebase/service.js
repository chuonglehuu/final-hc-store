import { Timestamp, addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./config";

export const addProduct = async (
  name,
  catagory,
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
    type: catagory,
    description: des,
    old_price: price.toString(),
    promotion: promo.toString(),
    new_price: currentPrice.toString(),
    url_img: image.name,
    create_at: Timestamp.fromDate(new Date()),
  });
  await uploadBytes(imgRef, image);
};
