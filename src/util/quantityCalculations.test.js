import { describe, expect, it } from "vitest";
import { changeWithButtonDraftAmount } from "./quantityCalculations";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../constants/cart";

describe("Util - Quantity Calculations", () => {
  describe("changeWithButtonDraftAmount", () => {
    it("correctly increases draft quantity", () => {
      const quantity = changeWithButtonDraftAmount(1, 5);
      expect(quantity).toBe(6);
    });
    it("correctly decreases draft quantity", () => {
      const quantity = changeWithButtonDraftAmount(-1, 5);
      expect(quantity).toBe(4);
    });
    it("correctly keeps draft quantity at maximum when increasing past limit", () => {
      const quantity = changeWithButtonDraftAmount(1, MAX_CART_QUANTITY);
      expect(quantity).toBe(MAX_CART_QUANTITY);
    });
    it("correctly keeps draft quantity at minimum when decreasing past limit", () => {
      const quantity = changeWithButtonDraftAmount(-1, MIN_CART_QUANTITY);
      expect(quantity).toBe(MIN_CART_QUANTITY);
    });
  });
});
