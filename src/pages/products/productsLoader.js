import axios from "axios";

const productsLoader = async (pageNumber) => {
  try {
    console.log("Products Loader - attempting post request");
    const response = await axios.get(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=6&hasImages=true&q=ukiyo-e",
    );
    const data = await response.data;
    //Max 100 objects shown
    const limitObjectIDs = data.objectIDs.slice(0, 100);
    console.log(limitObjectIDs);
    //separate into different 'pages' of 12
    const paginatedObjectIds = new Map();
    for (let i = 0; i < limitObjectIDs.length; i++) {
      if (i % 12 === 0) {
        paginatedObjectIds.set(i / 12 + 1, [limitObjectIDs[i]]);
        continue;
      }
      let current = paginatedObjectIds.get(Math.trunc(i / 12) + 1);
      current.push(limitObjectIDs[i]);
      paginatedObjectIds.set(Math.trunc(i / 12) + 1, current);
    }

    console.log("Products Loader - object IDs");
    console.log(paginatedObjectIds);

    const currentPageData = [];
    const currentPageObjectIDs = paginatedObjectIds.get(Number(pageNumber));
    for (const id of currentPageObjectIDs) {
      const objectResponse = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
      );
      currentPageData.push(objectResponse.data);
    }
    console.log("Products Loader - current page data");
    console.log(currentPageData);
    return currentPageData;
  } catch (error) {
    console.log("Products loader error");
    console.error(error);
    s;
  }
};

export default productsLoader;
