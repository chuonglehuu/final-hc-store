import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classNames from "classnames/bind";
import { collection, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db, storage } from "../../firebase/config";
import styles from "./Product.module.scss";

const cx = classNames.bind(styles);

const ITEMS_PER_PAGE = 6;

function Product() {
  const { role } = UserAuth();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    onSnapshot(collection(db, "products"), async (snapshot) => {
      const temp = [];
      for (const doc of snapshot.docs) {
        const data = doc.data();
        const id = doc.id;

        if (data.url_img) {
          const url = await getDownloadURL(
            ref(storage, `products/${data.url_img}`)
          );

          temp.push({ ...data, id, url_img: url });
        }
        if (!data.url_img) {
          temp.push({ ...data, id });
        }
      }
      setProducts(temp);
    });
  }, []);

  return (
    <div className={cx("main")}>
      {products
        .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
        .map((item) => (
          <Card
            key={item.id}
            sx={{ maxWidth: 345 }}
            style={{ border: "1px solid #999" }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image={item.url_img}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {item.new_price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            {role === 2 && (
              <CardActions>
                <Button size="small">Buy</Button>
              </CardActions>
            )}
          </Card>
        ))}
      <div className={cx("pagination")}>
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button
            className={cx("page_number")}
            style={{
              backgroundColor:
                pageNumber + 1 === currentPage ? "bisque" : "#ffffff",
            }}
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber + 1)}
          >
            {pageNumber + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Product;
