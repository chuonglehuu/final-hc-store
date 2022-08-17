import className from "classnames/bind";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <Sidebar />
        <div>{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
