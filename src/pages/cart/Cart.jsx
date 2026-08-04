import { useOutletContext } from "react-router";
import CartItem from "../../components/cartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const [cartItems, setCartItems] = useOutletContext();

  const cartFrequencyCounter = new Map();
  const uniqueCartItems = [];

  for (const item of cartItems) {
    const itemId = item.objectID;
    const currentCount = cartFrequencyCounter.get(itemId) || 0;

    cartFrequencyCounter.set(itemId, currentCount + 1);

    if (currentCount === 0) {
      uniqueCartItems.push(item);
    }
  }

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
        {uniqueCartItems.map((arrayItem) => (
          <CartItem
            key={arrayItem.objectID}
            itemDetails={{
              name: arrayItem.objectName,
              id: arrayItem.objectID,
              price: arrayItem.objectID,
              imageUrl: arrayItem.primaryImageSmall,
              amount: cartFrequencyCounter.get(arrayItem.objectID),
            }}
            deleteFromCart={(id) => {
              let arrayWithoutProduct = cartItems.filter(
                (item) => id !== item.objectID,
              );
              setCartItems(arrayWithoutProduct);
            }}
          />
        ))}
      </section>
      <section className={styles.checkoutSection}></section>
    </main>
  );
}

export default Cart;
