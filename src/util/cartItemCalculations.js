import limit from "./limit";

export const sumAllCartItems = (cartItemArray) => {
  if (cartItemArray.length === 0) return 0;
  else {
    return cartItemArray.reduce((acc, current) => acc + current[1], 0);
  }
};

export const calcAmountPerProduct = (cartItems, productID) => {
  let cartItem = cartItems.find((arrayItem) => {
    return arrayItem[0].id === productID;
  });
  return cartItem === undefined ? 0 : cartItem[1];
};

export const deleteProductFromCart = (setState, productID) => {
  setState((prev) => prev.filter((product) => product[0].id !== productID));
};
