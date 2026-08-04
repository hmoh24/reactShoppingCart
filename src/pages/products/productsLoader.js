import axios from "axios";

const productsLoader = async () => {
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
        paginatedObjectIds.set(i / 12, [limitObjectIDs[i]]);
        continue;
      }
      let current = paginatedObjectIds.get(Math.trunc(i / 12));
      current.push(limitObjectIDs[i]);
      paginatedObjectIds.set(Math.trunc(i / 12), current);
    }

    console.log("Products Loader - object IDs");
    console.log(paginatedObjectIds);

    //return first 'oage' of objects only
    const firstPageData = [];
    for (const id of paginatedObjectIds.get(0)) {
      const objectResponse = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`,
      );
      firstPageData.push(objectResponse.data);
    }
    console.log("Products Loader - first page data");
    console.log(firstPageData);
    return firstPageData;
  } catch (error) {
    console.log("Products loader error");
    console.error(error);
    s;
  }
};

export default productsLoader;
