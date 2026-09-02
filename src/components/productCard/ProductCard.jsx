import styles from "./ProductCard.module.css";
import stripHtml from "../../util/stripHTML";
import limit from "../../util/limit";

function ProductCard({ productData, setCartItems, cartItems, loadingState }) {
  //create a draft state, then only when draft state becomes a number do we update the cart state

  const [min, max] = [0, 10];

  const calcTotalCartItems = () => {
    let cartItem = cartItems.find((arrayItem) => {
      return arrayItem[0].id === productData.id;
    });
    return cartItem === undefined ? 0 : cartItem[1];
  };

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

  const changeProductCartTotal = (amount) => {
    let index = cartItems.findIndex(
      (arrayItem) => arrayItem[0].id === productData.id,
    );

    setCartItems((prev) => {
      const mapped = prev.map((item) => {
        if (item[0].id === productData.id) {
          let copy = [...item];
          copy[1] = limit((copy[1] += amount), min, max);
          return copy;
        }
        return item;
      });
      return mapped;
    });
  };

  const onInputTextChange = (event) => {
    const inputNumber = event.target.value;
    const desiredNumber = inputNumber - calcTotalCartItems();
    changeProductCartTotal(desiredNumber);
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
            {calcTotalCartItems() === 0 ? (
              <button
                onClick={() => {
                  isProductDataInCart()
                    ? changeProductCartTotal(1)
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
                    changeProductCartTotal(-1);
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={calcTotalCartItems()}
                  onChange={(e) => onInputTextChange(e)}
                  min={min}
                  max={max}
                />
                <button
                  type="button"
                  onClick={() => {
                    changeProductCartTotal(1);
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
