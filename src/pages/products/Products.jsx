import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useLoaderData } from "react-router";

function Products() {
  const { productsFetch } = useLoaderData();

  const buildImageURL = (identifier) => {
    return `${productsFetch.config.iiif_url}/${identifier}/full/843,/0/default.jpg`;
  };

  return (
    <main className={styles.productsPage}>
      <h1>Products</h1>
      <section className={styles.productCardGrid}>
        {productsFetch.data.map((arrayItem) => {
          return (
            <ProductCard
              key={arrayItem.id}
              cardInfo={{
                title: arrayItem.title,
                description: arrayItem.description,
                imageURL: buildImageURL(arrayItem.image_id),
              }}
            />
          );
        })}
      </section>
      <div className={styles.pageButtons}>
        <button type="button">Next</button>
      </div>
    </main>
  );
}

export default Products;
