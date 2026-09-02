import { useOutletContext } from "react-router";
import CartItem from "../../components/cartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const [cartItems, setCartItems] = useOutletContext();
  const nonEmptyCartItems = cartItems.filter((arrayItem) => arrayItem[1] !== 0);
  console.log("cart items: ", cartItems);

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
        {nonEmptyCartItems.map((arrayItem) => (
          <CartItem
            key={arrayItem[0].id}
            itemDetails={{
              name: arrayItem[0].title,
              id: arrayItem[0].id,
              price: arrayItem[0].id,
              imageUrl: arrayItem[0].imageURL,
              amount: arrayItem[1],
            }}
            setCartItems={setCartItems}
            cartItems={cartItems}
          />
        ))}
      </section>
      <section className={styles.checkoutSection}></section>
    </main>
  );
}

export default Cart;
