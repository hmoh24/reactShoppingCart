import styles from "./Products.module.css";
import ProductCard from "../../components/productCard/ProductCard";
import {
  useLoaderData,
  useParams,
  Link,
  useOutletContext,
  useNavigation,
} from "react-router";
import ProductCardPlaceholder from "../../components/productCard/ProductCardPlaceholder";

function Products() {
  const params = useParams();
  const { productsFetch } = useLoaderData();
  const [cartItems, setCartItems] = useOutletContext();
  const navigation = useNavigation();
  const loadingState = navigation.state;
  const placeholder = new Array(12).fill(0);
  const currentPage = Number(params.pageNumber);

  return (
    <main className={styles.productsPage}>
      <h1>Products</h1>
      <p>{`Page ${params.pageNumber} of ${productsFetch.pageTotal}`}</p>
      <section className={styles.productCardGrid}>
        {loadingState === "loading"
          ? placeholder.map((arrayItem, index) => {
              return <ProductCardPlaceholder />;
            })
          : productsFetch.productData.map((arrayItem) => {
              return (
                <ProductCard
                  key={arrayItem.objectID}
                  productData={{
                    id: arrayItem.objectID,
                    title: arrayItem.title,
                    description: arrayItem.period,
                    imageURL: arrayItem.primaryImage,
                    imageAltText: `${arrayItem.title} by ${arrayItem.artistDisplayName}`,
                  }}
                  setCartItems={setCartItems}
                  cartItems={cartItems}
                />
              );
            })}
      </section>
      <div className={styles.pageButtons}>
        <li>
          {currentPage <= 1 ? (
            <span aria-disabled="true">Previous</span>
          ) : (
            <Link to={`/products/${currentPage - 1}`}>Previous</Link>
          )}
        </li>
        <li>
          {currentPage >= productsFetch.pageTotal ? (
            <span aria-disabled="true">Next</span>
          ) : (
            <Link to={`/products/${currentPage + 1}`}>Next</Link>
          )}
        </li>
      </div>
    </main>
  );
}

export default Products;
