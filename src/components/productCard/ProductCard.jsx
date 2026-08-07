import styles from "./ProductCard.module.css";
import stripHtml from "../../util/stripHTML";

function ProductCard({ cardInfo, addToCart, cartItems, loadingState }) {
  return (
    <div className={styles.productCard}>
      {loadingState === "loading" ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
        </div>
      ) : (
        <>
          <h2>{cardInfo.title}</h2>
          <img
            src={cardInfo.imageURL}
            alt=""
            className={styles.productCardImg}
          />
          <p>{stripHtml(cardInfo.description)}</p>
          <div className={styles.productBottom}>
            <input
              type="text"
              placeholder={
                cartItems.filter((product) => product.objectID === cardInfo.id)
                  .length
              }
            />
            <button
              onClick={() => {
                addToCart();
              }}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCard;
