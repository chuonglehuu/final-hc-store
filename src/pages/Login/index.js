import { Helmet } from "react-helmet";
import FormLogin from "../../components/Layout/FormLogin";

function Login() {
  return (
    <div>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="" />
      </Helmet>
      <FormLogin />
    </div>
  );
}

export default Login;
