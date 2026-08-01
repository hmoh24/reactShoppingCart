import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import "./App.css";
import "./globals.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import axios from "axios";

function App() {
  useEffect(() => {
    const fetchSculptureData = async () => {
      try {
        const response = await axios.post(
          "https://api.artic.edu/api/v1/artworks/search?fields=id,title,thumbnail,image_id,artist_display,artist_title,classification_titles,date_display,main_reference_number",
          {
            query: {
              bool: {
                must: [
                  {
                    match: {
                      "artist_title.keyword": "Ancient Roman",
                    },
                  },
                  {
                    match: {
                      classification_titles: "Sculpture",
                    },
                  },
                ],
              },
            },
          },
        );
        const data = await response.data;
        return data;
      } catch (error) {
        console.error(error);
        s;
      } finally {
      }
    };
    console.log(fetchSculptureData());
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
