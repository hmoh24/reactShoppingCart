import CartItem from "../../components/cartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const cartItemsPlaceholder = new Array(6).fill(0);

  return (
    <main className={styles.cartPage}>
      <h1 className={styles.cartHeader}>Cart</h1>
      <section className={styles.cartItemGrid}>
        <section className={styles.cartItemGridHeader}>
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Total</h4>
        </section>
        {cartItemsPlaceholder.map((arrayItem) => (
          <CartItem />
        ))}
      </section>
      <section className={styles.checkoutSection}></section>
    </main>
  );
}

export default Cart;
