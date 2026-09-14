import styles from "./ProductCard.module.css";

export default function ProductCardPlaceholder() {
  return (
    <div className={styles.productCard}>
      <div className={styles.loadingState}>
        <div className={styles.spinner} />
      </div>
    </div>
  );
}
