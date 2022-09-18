import { UserAuth } from "../../context/AuthContext";

function Product() {
  const { user } = UserAuth();
  console.log(user);
  return <h2>Product page</h2>;
}

export default Product;
