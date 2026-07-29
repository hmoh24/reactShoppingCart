import styles from "./ProductCard.module.css";

function ProductCard() {
  return (
    <div className={styles.productCard}>
      <h2>Product Name</h2>
      <img src="" alt="" className={styles.productCardImg} />
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi
        consequuntur reiciendis maxime impedit iste! Iste id quo nihil veniam in
        provident soluta ipsa nulla aperiam!
      </p>
      <div className={styles.productBottom}>
        <input type="text" placeholder="0" />
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
