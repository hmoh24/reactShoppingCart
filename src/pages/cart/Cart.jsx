import { useOutletContext } from "react-router";
import CartItem from "../../components/cartItem/CartItem";
import styles from "./Cart.module.css";
import { sumAllCartItems } from "../../util/cartItemCalculations";

function Cart() {
  const [cartItems, setCartItems] = useOutletContext();
  const nonEmptyCartItems = cartItems.filter((arrayItem) => arrayItem[1] !== 0);
  console.log("cart items: ", cartItems);

  const totalItems = sumAllCartItems(cartItems);
  const totalCost = cartItems.reduce(
    (acc, curr) => acc + curr[1] * curr[0].id,
    0,
  );
  const taxCost = Math.round(totalCost * 0.2);
  const finalTotal = totalCost + taxCost;

  return (
    <main className={styles.cartPage}>
      <h1 className={styles.cartHeader}>Cart</h1>
      <section className={styles.cartItemGrid}>
        <section className={styles.cartItemGridHeader}>
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
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
      <section className={styles.checkoutSection}>
        <h2>Summary</h2>
        <div className={styles.summaryDetails}>
          <div className={styles.summaryDetailsRow}>
            <p>Total items</p>
            <p>{totalItems} items</p>
          </div>
          <div className={styles.summaryDetailsRow}>
            <p>Subtotal</p>
            <p>£{totalCost}</p>
          </div>
          <div className={styles.summaryDetailsRow}>
            <p>Taxes</p>
            <p>£{taxCost}</p>
          </div>
          <div className={styles.summaryDetailsRow}>
            <p>Discount</p>
            <p>−£{0.0}</p>
          </div>
          <div className={styles.summaryDetailsRow}>
            <p>Final payment</p>
            <p>£{finalTotal}</p>
          </div>
          <div className={styles.summaryDetailsRow}>
            <input
              type="text"
              placeholder="Enter promo code"
              aria-label="Promo code"
              maxLength={20}
            />
            <button type="button">Apply</button>
          </div>
        </div>
        <button type="button">CHECKOUT</button>
      </section>
    </main>
  );
}

export default Cart;
