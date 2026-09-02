import styles from "./CartItem.module.css";
import {
  deleteProductFromCart,
  calcAmountPerProduct,
} from "../../util/cartItemCalculations";
import limit from "../../util/limit";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../../constants/cart";

function CartItem({ itemDetails, setCartItems, cartItems }) {
  const changeProductAmountInCart = (amount) => {
    let index = cartItems.findIndex(
      (arrayItem) => arrayItem[0].id === itemDetails.id,
    );

    setCartItems((prev) => {
      const mapped = prev.map((item) => {
        if (item[0].id === itemDetails.id) {
          let copy = [...item];
          copy[1] = limit(
            (copy[1] += amount),
            MIN_CART_QUANTITY,
            MAX_CART_QUANTITY,
          );
          return copy;
        }
        return item;
      });
      return mapped;
    });
  };

  const onInputTextChange = (event) => {
    const inputNumber = event.target.value;
    const desiredNumber =
      inputNumber - calcAmountPerProduct(cartItems, itemDetails.id);
    changeProductAmountInCart(desiredNumber);
  };

  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItemDetails}>
        <img src={itemDetails.imageUrl} alt="" className={styles.cartItemImg} />
        <div className="cartItemText">
          <h3 className={styles.cartItemName}>{itemDetails.name}</h3>
          <button
            onClick={() => deleteProductFromCart(setCartItems, itemDetails.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <p className={styles.cartItemCost}>{itemDetails.price}</p>
      <input
        type="number"
        value={calcAmountPerProduct(cartItems, itemDetails.id)}
        onChange={(e) => onInputTextChange(e)}
        className={styles.cartItemInput}
        min={MIN_CART_QUANTITY}
        max={MAX_CART_QUANTITY}
      />
      <p className={styles.cartItemTotal}>
        {itemDetails.price * itemDetails.amount}
      </p>
    </div>
  );
}

export default CartItem;
