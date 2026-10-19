import styles from "./ProductCard.module.css";
import stripHtml from "../../util/stripHTML";
import limit from "../../util/limit";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../../constants/cart";
import {
  calcAmountPerProduct,
  changeProductAmountInCart,
  isProductInCart,
  addProductToCart,
} from "../../util/cartCalculations";
import { changeWithButtonDraftAmount } from "../../util/quantityCalculations";
import { useState } from "react";

function ProductCard({ productData, setCartItems, cartItems, loadingState }) {
  //create a draft state, then only when draft state becomes a number do we update the cart state
  const [inputDraft, setInputDraft] = useState(
    calcAmountPerProduct(cartItems, productData.id),
  );

  const handleQuantityChange = (amount) => {
    setCartItems((prev) =>
      changeProductAmountInCart(prev, productData.id, amount),
    );
  };

  const onInputTextChange = (inputNumber) => {
    const desiredNumber =
      inputNumber - calcAmountPerProduct(cartItems, productData.id);
    handleQuantityChange(desiredNumber);
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
                  isProductInCart(cartItems, productData.id)
                    ? handleQuantityChange(1)
                    : setCartItems((prev) =>
                        addProductToCart(prev, productData),
                      );
                  setInputDraft(changeWithButtonDraftAmount(1, inputDraft));
                }}
              >
                Add to Cart
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    handleQuantityChange(-1);
                    setInputDraft(changeWithButtonDraftAmount(-1, inputDraft));
                  }}
                >
                  -
                </button>
                <input
                  aria-label="Quantity"
                  type="number"
                  value={inputDraft}
                  onChange={(event) => setInputDraft(event.target.value)}
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
                    handleQuantityChange(1);
                    setInputDraft(changeWithButtonDraftAmount(1, inputDraft));
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
