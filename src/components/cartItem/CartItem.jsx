import styles from "./CartItem.module.css";

function CartItem() {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <img src="" alt="" className={styles.cartItemImg} />
        <div className="cartItemText">
          <h3 className={styles.cartItemName}>Product Name</h3>
          <button>Delete</button>
        </div>
      </div>
      <p className={styles.cartItemCost}>$320,000</p>
      <input type="text" className={styles.cartItemInput} />
      <p className={styles.cartItemTotal}>$320,000</p>
    </div>
  );
}

export default CartItem;
