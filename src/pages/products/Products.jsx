import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import {
  useLoaderData,
  useParams,
  Link,
  useOutletContext,
  useNavigation,
} from "react-router";

function Products() {
  const params = useParams();
  const { productsFetch } = useLoaderData();
  const [cartItems, setCartItems] = useOutletContext();
  const navigation = useNavigation();
  const loadingState = navigation.state;
  const placeholder = new Array(12).fill(0);
  console.log(loadingState);

  return (
    <main className={styles.productsPage}>
      <h1>Products</h1>
      <section className={styles.productCardGrid}>
        {loadingState === "loading"
          ? placeholder.map((arrayItem, index) => {
              return <ProductCard key={index} loadingState={loadingState} />;
            })
          : productsFetch.map((arrayItem) => {
              return (
                <ProductCard
                  key={arrayItem.objectID}
                  cardInfo={{
                    id: arrayItem.objectID,
                    title: arrayItem.title,
                    description: arrayItem.period,
                    imageURL: arrayItem.primaryImage,
                  }}
                  addToCart={() =>
                    setCartItems((prev) => {
                      return [...prev, arrayItem];
                    })
                  }
                  cartItems={cartItems}
                />
              );
            })}
      </section>
      <div className={styles.pageButtons}>
        <li>
          <Link
            to={`/products/${Number(params.pageNumber) - 1 > 0 ? Number(params.pageNumber) - 1 : 1}`}
          >
            Previous
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
