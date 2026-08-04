import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import { useLoaderData, useParams, Link, useOutletContext } from "react-router";

function Products() {
  const params = useParams();
  const { productsFetch } = useLoaderData();
  const [cartItems, setCartItems] = useOutletContext();

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
              addToCart={() =>
                setCartItems((prev) => {
                  return [...prev, arrayItem];
                })
              }
            />
          );
        })}
      </section>
      <div className={styles.pageButtons}>
        <li>
          <Link
            to={`/products/${Number(params.pageNumber) - 1 > 0 ? Number(params.pageNumber) - 1 : 1}`}
          >
            Next
          </Link>
        </li>
        <li>
          <Link
            to={`/products/${Number(params.pageNumber) + 1 < 13 ? Number(params.pageNumber) + 1 : 12}`}
          >
            Next
          </Link>
        </li>
      </div>
    </main>
  );
}

export default Products;
