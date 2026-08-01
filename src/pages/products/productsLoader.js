import axios from "axios";

const productsLoader = async () => {
  try {
    console.log("Products Loader - attempting post request");
    const response = await axios.get(
      "https://api.artic.edu/api/v1/artworks/search?fields=id,title,description,thumbnail,image_id,artist_display,artist_title,classification_titles,date_display,main_reference_number&limit=12",
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
    console.log("Products Loader - data");
    console.log(data);
    return data;
  } catch (error) {
    console.log("Products loader error");
    console.error(error);
    s;
  }
};

export default productsLoader;
