import styles from "./CartItem.module.css";

function CartItem({ itemDetails }) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <img src={itemDetails.imageUrl} alt="" className={styles.cartItemImg} />
        <div className="cartItemText">
          <h3 className={styles.cartItemName}>{itemDetails.name}</h3>
          <button>Delete</button>
        </div>
      </div>
      <p className={styles.cartItemCost}>{itemDetails.price}</p>
      <input
        type="text"
        className={styles.cartItemInput}
        placeholder={itemDetails.amount}
      />
      <p className={styles.cartItemTotal}>{itemDetails.price}</p>
    </div>
  );
}

export default CartItem;
