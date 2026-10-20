import { describe, expect, it } from "vitest";
import {
  sumAllCartItems,
  calcAmountPerProduct,
  calcTotalCost,
  calcTaxCost,
  calcFinalTotal,
  isProductInCart,
  addProductToCart,
  changeProductAmountInCart,
  deleteProductFromCart,
} from "./cartCalculations";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../constants/cart";

describe("Util - Cart Calculations", () => {
  let cartItems = [
    [
      {
        id: 789144,
        title:
          "“‘Little Purple Gromwell’ (Wakamurasaki): Shōshō,”… with Ukiyo-e Pictures (Genji-gumo ukiyo e-awase)",
        description: "Edo period (1615–1868)",
        imageURL:
          "https://images.metmuseum.org/CRDImages/as/original/DP-16050-001.jpg",
        imageAltText:
          "“‘Little Purple Gromwell’ (Wakamurasaki): Shōshō,”…s (Genji-gumo ukiyo e-awase) by Utagawa Kuniyoshi",
      },
      3,
    ],
    [
      {
        id: 789145,
        title:
          "“‘A Molted Cicada Shell’ (Utsusemi): Soga Gorō Tok… with Ukiyo-e Pictures (Genji-gumo ukiyo e-awase)",
        description: "Edo period (1615–1868)",
        imageURL:
          "https://images.metmuseum.org/CRDImages/as/original/DP-16052-001.jpg",
        imageAltText:
          "“‘A Molted Cicada Shell’ (Utsusemi): Soga Gorō Tok…s (Genji-gumo ukiyo e-awase) by Utagawa Kuniyoshi",
      },
      2,
    ],
    [
      {
        id: 789148,
        title:
          "“‘Exile to Suma’ (Suma): Tamaori-hime,” from the s… with Ukiyo-e Pictures (Genji-gumo ukiyo e-awase)",
        description: "Edo period (1615–1868)",
        imageURL:
          "https://images.metmuseum.org/CRDImages/as/original/DP-16055-001.jpg",
        imageAltText:
          "“‘Exile to Suma’ (Suma): Tamaori-hime,” from the s…s (Genji-gumo ukiyo e-awase) by Utagawa Kuniyoshi",
      },
      1,
    ],
  ];
  let emptyCart = [];
  let cartItemsWithNoQuantity = [
    [
      {
        id: 789144,
        title:
          "“‘Little Purple Gromwell’ (Wakamurasaki): Shōshō,”… with Ukiyo-e Pictures (Genji-gumo ukiyo e-awase)",
        description: "Edo period (1615–1868)",
        imageURL:
          "https://images.metmuseum.org/CRDImages/as/original/DP-16050-001.jpg",
        imageAltText:
          "“‘Little Purple Gromwell’ (Wakamurasaki): Shōshō,”…s (Genji-gumo ukiyo e-awase) by Utagawa Kuniyoshi",
      },
      0,
    ],
    [
      {
        id: 789145,
        title:
          "“‘A Molted Cicada Shell’ (Utsusemi): Soga Gorō Tok… with Ukiyo-e Pictures (Genji-gumo ukiyo e-awase)",
        description: "Edo period (1615–1868)",
        imageURL:
          "https://images.metmuseum.org/CRDImages/as/original/DP-16052-001.jpg",
        imageAltText:
          "“‘A Molted Cicada Shell’ (Utsusemi): Soga Gorō Tok…s (Genji-gumo ukiyo e-awase) by Utagawa Kuniyoshi",
      },
      0,
    ],
    [
      {
        id: 789148,
        title:
          "“‘Exile to Suma’ (Suma): Tamaori-hime,” from the s… with Ukiyo-e Pictures (Genji-gumo ukiyo e-awase)",
        description: "Edo period (1615–1868)",
        imageURL:
          "https://images.metmuseum.org/CRDImages/as/original/DP-16055-001.jpg",
        imageAltText:
          "“‘Exile to Suma’ (Suma): Tamaori-hime,” from the s…s (Genji-gumo ukiyo e-awase) by Utagawa Kuniyoshi",
      },
      0,
    ],
  ];

  describe("sumAllCartItems", () => {
    it("correctly sums multiple items", () => {
      const quantity = sumAllCartItems(cartItems);
      expect(quantity).toBe(6);
    });
    it("correctly handles empty cart array", () => {
      const quantity = sumAllCartItems(emptyCart);
      expect(quantity).toBe(0);
    });
    it("correctly handles cart array objects with 0 quantity", () => {
      const quantity = sumAllCartItems(cartItemsWithNoQuantity);
      expect(quantity).toBe(0);
    });
    it("correctly handles one item with quantity more than 1", () => {
      let cartWithOneItem = [cartItems[0]];
      const quantity = sumAllCartItems(cartWithOneItem);
      expect(quantity).toBe(3);
    });
  });

  describe("calcAmountPerProduct", () => {
    it("correctly returns quantity for existing product IDs", () => {
      const productA = calcAmountPerProduct(cartItems, 789144);
      expect(productA).toBe(3);
      const productB = calcAmountPerProduct(cartItems, 789145);
      expect(productB).toBe(2);
    });
    it("correctly returns 0 for non-existent product IDs", () => {
      const productA = calcAmountPerProduct(cartItems, 7891442);
      expect(productA).toBe(0);
      const productB = calcAmountPerProduct(cartItems, 7891425);
      expect(productB).toBe(0);
    });
    it("correctly returns 0 for empty cart array", () => {
      const quantity = calcAmountPerProduct(emptyCart, 789144);
      expect(quantity).toBe(0);
    });
    it("correctly returns 0 for existing product with 0 quantity", () => {
      const quantity = calcAmountPerProduct(cartItemsWithNoQuantity, 789144);
      expect(quantity).toBe(0);
    });
  });

  describe("isProductInCart", () => {
    it("correctly returns false for non-existent product IDs", () => {
      const productA = isProductInCart(cartItems, 7891442);
      expect(productA).toBe(false);
    });
    it("correctly returns true for existing product IDs", () => {
      const productA = isProductInCart(cartItems, 789144);
      expect(productA).toBe(true);
    });
    it("correctly returns true for existing product with 0 quantity", () => {
      const productA = isProductInCart(cartItemsWithNoQuantity, 789144);
      expect(productA).toBe(true);
    });
  });

  describe("addProductToCart", () => {
    it("correctly adds product to empty cart with quantity 1", () => {
      const productData = { id: 789149 };
      const updatedCart = addProductToCart(emptyCart, productData);
      expect(updatedCart).toEqual([[productData, 1]]);
    });
    it("correctly adds product without changing existing items", () => {
      const productData = { id: 789149 };
      const updatedCart = addProductToCart(cartItems, productData);
      expect(updatedCart).toEqual([...cartItems, [productData, 1]]);
    });
    it("correctly leaves original cart array unchanged", () => {
      let originalCartItems = [...cartItems];
      const productData = { id: 789149 };
      const updatedCart = addProductToCart(cartItems, productData);
      expect(cartItems).toEqual(originalCartItems);
      expect(updatedCart).not.toBe(cartItems);
    });
  });

  describe("changeProductAmountInCart", () => {
    it("correctly increases quantity for matching product", () => {
      const updatedCart = changeProductAmountInCart(cartItems, 789144, 1);
      expect(updatedCart).toEqual([
        [cartItems[0][0], 4],
        cartItems[1],
        cartItems[2],
      ]);
    });
    it("correctly decreases quantity for matching product", () => {
      const updatedCart = changeProductAmountInCart(cartItems, 789144, -1);
      expect(updatedCart[0][1]).toBe(2);
    });
    it("correctly limits quantity to maximum", () => {
      const updatedCart = changeProductAmountInCart(
        cartItems,
        789144,
        MAX_CART_QUANTITY,
      );
      expect(updatedCart[0][1]).toBe(MAX_CART_QUANTITY);
    });
    it("correctly limits quantity to minimum", () => {
      const updatedCart = changeProductAmountInCart(cartItems, 789144, -10);
      expect(updatedCart[0][1]).toBe(MIN_CART_QUANTITY);
    });
    it("correctly leaves items unchanged for non-existent product IDs", () => {
      const updatedCart = changeProductAmountInCart(cartItems, 7891442, 1);
      expect(updatedCart).toEqual(cartItems);
    });
    it("correctly handles empty cart array", () => {
      const updatedCart = changeProductAmountInCart(emptyCart, 789144, 1);
      expect(updatedCart).toEqual([]);
    });
    it("correctly leaves original cart array and quantities unchanged", () => {
      let originalCartItems = cartItems.map((item) => [...item]);
      const updatedCart = changeProductAmountInCart(cartItems, 789144, 1);
      expect(cartItems).toEqual(originalCartItems);
      expect(updatedCart).not.toBe(cartItems);
      expect(updatedCart[0]).not.toBe(cartItems[0]);
    });
  });

  describe("calcTotalCost", () => {
    it("correctly sums costs across multiple products and quantities", () => {
      const cartItems = [
        [{ id: 10 }, 3],
        [{ id: 25 }, 2],
      ];
      const totalCost = calcTotalCost(cartItems);
      expect(totalCost).toBe(80);
    });
    it("correctly calculates cost for a single product with multiple quantities", () => {
      const cartItems = [[{ id: 15 }, 4]];
      const totalCost = calcTotalCost(cartItems);
      expect(totalCost).toBe(60);
    });
    it("correctly returns 0 for empty cart array", () => {
      const totalCost = calcTotalCost(emptyCart);
      expect(totalCost).toBe(0);
    });
    it("correctly ignores products with 0 quantity", () => {
      const cartItems = [
        [{ id: 10 }, 0],
        [{ id: 25 }, 2],
      ];
      const totalCost = calcTotalCost(cartItems);
      expect(totalCost).toBe(50);
    });
  });

  describe("calcTaxCost", () => {
    it("correctly calculates 20 percent tax", () => {
      const taxCost = calcTaxCost(100);
      expect(taxCost).toBe(20);
    });
    it("correctly rounds tax down to the nearest whole number", () => {
      const taxCost = calcTaxCost(12);
      expect(taxCost).toBe(2);
    });
    it("correctly rounds tax up to the nearest whole number", () => {
      const taxCost = calcTaxCost(13);
      expect(taxCost).toBe(3);
    });
    it("correctly returns 0 for zero total cost", () => {
      const taxCost = calcTaxCost(0);
      expect(taxCost).toBe(0);
    });
  });

  describe("calcFinalTotal", () => {
    it("correctly adds total cost and tax cost", () => {
      const finalTotal = calcFinalTotal(100, 20);
      expect(finalTotal).toBe(120);
    });
    it("correctly preserves total cost when tax cost is 0", () => {
      const finalTotal = calcFinalTotal(2, 0);
      expect(finalTotal).toBe(2);
    });
    it("correctly returns 0 when total cost and tax cost are 0", () => {
      const finalTotal = calcFinalTotal(0, 0);
      expect(finalTotal).toBe(0);
    });
  });

  describe("deleteProductFromCart", () => {
    it("correctly returns new array without filtered out object", () => {
      const filteredArray = deleteProductFromCart(cartItems, 789144);
      const filteredObject = filteredArray.find(
        (object) => object[0].id === 789144,
      );
      expect(filteredArray.length).toBe(2);
      expect(filteredObject).toBe(undefined);
    });
    it("correctly leaves items unchanged for non-existent product IDs", () => {
      const filteredArray = deleteProductFromCart(cartItems, 7891442);
      expect(filteredArray).toEqual(cartItems);
    });
    it("correctly handles empty cart array", () => {
      const filteredArray = deleteProductFromCart(emptyCart, 789144);
      expect(filteredArray).toEqual([]);
    });
    it("correctly returns empty array when deleting the only item", () => {
      let cartWithOneItem = [cartItems[0]];
      const filteredArray = deleteProductFromCart(cartWithOneItem, 789144);
      expect(filteredArray).toEqual([]);
    });
    it("correctly leaves original cart array unchanged", () => {
      let originalCartItems = [...cartItems];
      const filteredArray = deleteProductFromCart(cartItems, 789144);
      expect(cartItems).toEqual(originalCartItems);
      expect(filteredArray).not.toBe(cartItems);
    });
  });
});
