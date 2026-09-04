import styles from "./ProductCard.module.css";
import stripHtml from "../../util/stripHTML";
import limit from "../../util/limit";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../../constants/cart";
import {
  calcAmountPerProduct,
  changeWithButtonDraftAmount,
  onDraftChange,
} from "../../util/cartItemCalculations";
import { useState } from "react";

function ProductCard({ productData, setCartItems, cartItems, loadingState }) {
  //create a draft state, then only when draft state becomes a number do we update the cart state
  const [inputDraft, setInputDraft] = useState(
    calcAmountPerProduct(cartItems, productData.id),
  );

  const isProductDataInCart = () => {
    let filtered = cartItems.filter((arrayItem) => {
      return arrayItem[0].id === productData.id;
    });
    return filtered.length ? true : false;
  };

  const addNewProductToCart = () => {
    setCartItems((prev) => {
      return [...prev, [productData, 1]];
    });
  };

  const changeProductAmountInCart = (amount) => {
    setCartItems((prev) => {
      const mapped = prev.map((item) => {
        if (item[0].id === productData.id) {
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
      inputNumber - calcAmountPerProduct(cartItems, productData.id);
    changeProductAmountInCart(desiredNumber);
  };

  return (
    <div className={styles.productCard}>
      {loadingState === "loading" ? (
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
        </div>
      ) : (
        <>
          <h2>{productData.title}</h2>
          <img
            src={productData.imageURL}
            alt={productData.imageAltText}
            className={styles.productCardImg}
          />
          <p>{stripHtml(productData.description)}</p>
          <div className={styles.productBottom}>
            {calcAmountPerProduct(cartItems, productData.id) === 0 ? (
              <button
                onClick={() => {
                  isProductDataInCart()
                    ? changeProductAmountInCart(1)
                    : addNewProductToCart();
                  changeWithButtonDraftAmount(1, inputDraft, setInputDraft);
                }}
              >
                Add to Cart
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    changeProductAmountInCart(-1);
                    changeWithButtonDraftAmount(-1, inputDraft, setInputDraft);
                  }}
                >
                  -
                </button>
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
                        productData.id,
                      );
                      event.target.value = revertedValue;
                      setInputDraft(revertedValue);
                    }
                  }}
                  min={MIN_CART_QUANTITY}
                  max={MAX_CART_QUANTITY}
                />
                <button
                  type="button"
                  onClick={() => {
                    changeProductAmountInCart(1);
                    changeWithButtonDraftAmount(1, inputDraft, setInputDraft);
                  }}
                >
                  +
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCard;
