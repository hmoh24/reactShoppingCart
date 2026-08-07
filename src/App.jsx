import { useState } from "react";
import { Outlet, useLocation, useNavigation } from "react-router";
import "./App.css";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import LoadingBanner from "./components/loadingBanner/LoadingBanner";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const location = useLocation();

  const showLoadingBanner =
    navigation.state === "loading" && !location.pathname.includes("products");

  return (
    <div className="appShell">
      <Navbar cartItemAmount={cartItems.length} />
      {showLoadingBanner && <LoadingBanner />}
      <Outlet context={[cartItems, setCartItems]} />
      <Footer />
    </div>
  );
}

export default App;
