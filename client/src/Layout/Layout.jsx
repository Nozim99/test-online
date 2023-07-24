import Navbar from "./Navbar/Navbar.jsx";
import Footer from "./Footer/Footer.jsx";

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;