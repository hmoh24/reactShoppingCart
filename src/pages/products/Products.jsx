import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useLoaderData } from "react-router";

function Products() {
  const { productsFetch } = useLoaderData();
  console.log(productsFetch);

  return (
    <main className={styles.productsPage}>
      <h1>Products</h1>
      <section className={styles.productCardGrid}>
        {productsFetch.map((arrayItem) => {
          return (
            <ProductCard
              key={arrayItem.objectID}
              cardInfo={{
                title: arrayItem.title,
                description: arrayItem.period,
                imageURL: arrayItem.primaryImage,
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
