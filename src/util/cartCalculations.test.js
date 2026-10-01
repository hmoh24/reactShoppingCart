import { beforeAll, describe, expect, it } from "vitest";
import {
  sumAllCartItems,
  calcAmountPerProduct,
  deleteProductFromCart,
} from "./cartCalculations";

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
