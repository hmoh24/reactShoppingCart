import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../constants/cart";
import limit from "./limit";

export const changeWithButtonDraftAmount = (amount, inputDraft) => {
  let newTotal = inputDraft + amount;
  let clampedTotal = limit(newTotal, MIN_CART_QUANTITY, MAX_CART_QUANTITY);
  return clampedTotal;
};
