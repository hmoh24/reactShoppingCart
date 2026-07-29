import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";

function Products() {
  const placeholderArray = new Array(16).fill(0);
  console.log(placeholderArray);

  return (
    <main className={styles.productsPage}>
      <h1>Products</h1>
      <section className={styles.productCardGrid}>
        {placeholderArray.map((arrayItem) => {
          return <ProductCard />;
        })}
      </section>
      <div className={styles.pageButtons}>
        <button type="button">Next</button>
      </div>
    </main>
  );
}

export default Products;
