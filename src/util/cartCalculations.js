import limit from "./limit";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../constants/cart";

export const sumAllCartItems = (cartItemArray) => {
  if (cartItemArray.length === 0) return 0;
  else {
    return cartItemArray.reduce((acc, current) => acc + current[1], 0);
  }
};

export const calcAmountPerProduct = (cartItemArray, productID) => {
  let cartItem = cartItemArray.find((arrayItem) => {
    return arrayItem[0].id === productID;
  });
  return cartItem === undefined ? 0 : cartItem[1];
};

export const isProductInCart = (cartItemArray, productID) => {
  return cartItemArray.some((item) => item[0].id === productID);
};

export const addProductToCart = (cartItemArray, productData) => {
  return [...cartItemArray, [productData, 1]];
};

export const changeProductAmountInCart = (cartItemArray, productID, amount) => {
  return cartItemArray.map((item) => {
    if (item[0].id === productID) {
      let copy = [...item];
      copy[1] = limit(copy[1] + amount, MIN_CART_QUANTITY, MAX_CART_QUANTITY);
      return copy;
    }
    return item;
  });
};

export const deleteProductFromCart = (cartItemArray, productID) => {
  return cartItemArray.filter((product) => product[0].id !== productID);
};
