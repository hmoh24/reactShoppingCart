import styles from "./ProductCard.module.css";
import stripHtml from "../../util/stripHTML";
import limit from "../../util/limit";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../../constants/cart";
import { calcAmountPerProduct } from "../../util/cartItemCalculations";

function ProductCard({ productData, setCartItems, cartItems, loadingState }) {
  //create a draft state, then only when draft state becomes a number do we update the cart state

  // const calcAmountPerProduct = () => {
  //   let cartItem = cartItems.find((arrayItem) => {
  //     return arrayItem[0].id === productData.id;
  //   });
  //   return cartItem === undefined ? 0 : cartItem[1];
  // };

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
    let index = cartItems.findIndex(
      (arrayItem) => arrayItem[0].id === productData.id,
    );

    setCartItems((prev) => {
      const mapped = prev.map((item) => {
        if (item[0].id === productData.id) {
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
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={calcAmountPerProduct(cartItems, productData.id)}
                  onChange={(e) => onInputTextChange(e)}
                  min={MIN_CART_QUANTITY}
                  max={MAX_CART_QUANTITY}
                />
                <button
                  type="button"
                  onClick={() => {
                    changeProductAmountInCart(1);
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
