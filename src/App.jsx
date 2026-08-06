import { useEffect, useState } from "react";
import { Outlet, useNavigation } from "react-router";
import "./App.css";
import "./globals.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  return (
    <>
      <Navbar cartItemAmount={cartItems.length} />
      {navigation.state === "loading" ? (
        "Loading"
      ) : (
        <Outlet context={[cartItems, setCartItems]} />
      )}
      <Footer />
    </>
  );
}

export default App;
