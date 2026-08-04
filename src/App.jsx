import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import "./globals.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  return (
    <>
      <Navbar cartItemAmount={cartItems.length} />
      <Outlet context={[cartItems, setCartItems]} />
      <Footer />
    </>
  );
}

export default App;
