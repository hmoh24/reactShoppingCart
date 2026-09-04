import styles from "./CartItem.module.css";
import {
  deleteProductFromCart,
  calcAmountPerProduct,
  changeWithButtonDraftAmount,
  onDraftChange,
} from "../../util/cartItemCalculations";
import limit from "../../util/limit";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../../constants/cart";
import { useState } from "react";

function CartItem({ itemDetails, setCartItems, cartItems }) {
  const [inputDraft, setInputDraft] = useState(
    calcAmountPerProduct(cartItems, itemDetails.id),
  );

  const changeProductAmountInCart = (amount) => {
    setCartItems((prev) => {
      const mapped = prev.map((item) => {
        if (item[0].id === itemDetails.id) {
          let copy = [...item];
          copy[1] = limit(
            copy[1] + amount,
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

  const onInputTextChange = (inputNumber) => {
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
        value={inputDraft}
        onChange={(event) => onDraftChange(event, setInputDraft)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur();
          }
        }}
        onBlur={(event) => {
          if (event.target.value !== "") {
            const validInput = limit(
              event.target.value,
              MIN_CART_QUANTITY,
              MAX_CART_QUANTITY,
            );
            onInputTextChange(validInput);
            setInputDraft(validInput);
          } else {
            const revertedValue = calcAmountPerProduct(
              cartItems,
              itemDetails.id,
            );
            event.target.value = revertedValue;
            setInputDraft(revertedValue);
          }
        }}
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
