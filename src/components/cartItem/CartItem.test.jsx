import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { MAX_CART_QUANTITY } from "../../constants/cart";
import CartItem from "./CartItem";

describe("Components - CartItem", () => {
  const itemDetails = {
    id: 1,
    name: "Purple Flowers",
    price: 20,
    imageUrl: "/flowers.jpg",
  };

  it("shows product details and the current quantity", () => {
    const initialCartItems = [[itemDetails, 2]];
    render(
      <CartItem
        itemDetails={itemDetails}
        cartItems={initialCartItems}
        setCartItems={() => {}}
      />,
    );

    expect(
      screen.getByRole("heading", { name: itemDetails.name }),
    ).toBeInTheDocument();
    expect(screen.getByText(String(itemDetails.price))).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });
  it("sets quantity to the maximum when a typed value exceeds the limit", async () => {
    const initialCartItems = [[itemDetails, 2]];
    const user = userEvent.setup();

    function TestCartItem() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <CartItem
          itemDetails={itemDetails}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      );
    }
    render(<TestCartItem />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, String(MAX_CART_QUANTITY + 1));
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(MAX_CART_QUANTITY);
  });
  it("commits a valid typed quantity when the input loses focus", async () => {
    const initialCartItems = [[itemDetails, 2]];
    const user = userEvent.setup();

    function TestCartItem() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <CartItem
          itemDetails={itemDetails}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      );
    }
    render(<TestCartItem />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "5");
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
    await user.clear(screen.getByRole("spinbutton"));
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });
  it("commits the typed quantity when Enter is pressed", async () => {
    const initialCartItems = [[itemDetails, 2]];
    const user = userEvent.setup();

    function TestCartItem() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <CartItem
          itemDetails={itemDetails}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      );
    }
    render(<TestCartItem />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "5{Enter}");
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
    expect(screen.getByRole("spinbutton")).not.toHaveFocus();
    await user.clear(screen.getByRole("spinbutton"));
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });
  it("restores the previous quantity when an empty input loses focus", async () => {
    const initialCartItems = [[itemDetails, 2]];
    const user = userEvent.setup();

    function TestCartItem() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <CartItem
          itemDetails={itemDetails}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      );
    }
    render(<TestCartItem />);

    await user.clear(screen.getByRole("spinbutton"));
    expect(screen.getByRole("spinbutton")).toHaveValue(null);
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });
});
