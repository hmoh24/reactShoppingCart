import { describe, expect, it } from "vitest";
import Cart from "./Cart";
import { createMemoryRouter, Outlet, RouterProvider } from "react-router";
import { render, screen, within } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

function renderCart(initialCartItems) {
  function TestAppShell() {
    const [cartItems, setCartItems] = useState(initialCartItems);
    return <Outlet context={[cartItems, setCartItems]} />;
  }

  const router = createMemoryRouter([
    {
      path: "/",
      Component: TestAppShell,
      children: [{ index: true, Component: Cart }],
    },
  ]);

  return render(<RouterProvider router={router} />);
}

describe("Cart", () => {
  const flowersProduct = {
    id: 10,
    title: "Purple Flowers",
    imageURL: "/flowers.jpg",
  };
  const wavesProduct = {
    id: 25,
    title: "Ocean Waves",
    imageURL: "/waves.jpg",
  };
  const mountainsProduct = {
    id: 15,
    title: "Misty Mountains",
    imageURL: "/mountains.jpg",
  };

  it("shows no product rows, cart is empty text, and zero summary totals when the cart is empty", () => {
    const initialCartItems = [];
    renderCart(initialCartItems);

    expect(screen.queryByText(flowersProduct.title)).not.toBeInTheDocument();
    expect(screen.queryByText(wavesProduct.title)).not.toBeInTheDocument();
    expect(screen.queryByText(mountainsProduct.title)).not.toBeInTheDocument();
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete" }),
    ).not.toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Cart", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Summary", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Product" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Price" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Quantity" })).toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    const totalItemsRow = screen.getByText("Total items").parentElement;
    expect(within(totalItemsRow).getByText("0 items")).toBeInTheDocument();
    for (const label of ["Subtotal", "Taxes", "Discount", "Final payment"]) {
      const summaryRow = screen.getByText(label).parentElement;
      expect(within(summaryRow).getByText("£0")).toBeInTheDocument();
    }

    expect(screen.getByRole("textbox", { name: "Promo code" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Apply" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "CHECKOUT" })).toBeInTheDocument();
  });
  it("shows product details and correct summary totals for multiple cart items", () => {
    const initialCartItems = [
      [flowersProduct, 2],
      [wavesProduct, 3],
    ];
    renderCart(initialCartItems);

    expect(
      screen.getByRole("heading", { name: flowersProduct.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: wavesProduct.title }),
    ).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();
    const quantityInputs = screen.getAllByRole("spinbutton");
    expect(quantityInputs).toHaveLength(2);
    expect(quantityInputs[0]).toHaveValue(2);
    expect(quantityInputs[1]).toHaveValue(3);
    expect(screen.getAllByRole("button", { name: "Delete" })).toHaveLength(2);
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();

    const totalItemsRow = screen.getByText("Total items").parentElement;
    expect(within(totalItemsRow).getByText("5 items")).toBeInTheDocument();
    const subtotalRow = screen.getByText("Subtotal").parentElement;
    expect(within(subtotalRow).getByText("£95")).toBeInTheDocument();
    const taxesRow = screen.getByText("Taxes").parentElement;
    expect(within(taxesRow).getByText("£19")).toBeInTheDocument();
    const discountRow = screen.getByText("Discount").parentElement;
    expect(within(discountRow).getByText("£0")).toBeInTheDocument();
    const finalPaymentRow = screen.getByText("Final payment").parentElement;
    expect(within(finalPaymentRow).getByText("£114")).toBeInTheDocument();
  });
  it("hides zero-quantity items and excludes them from summary totals", () => {
    const initialCartItems = [
      [flowersProduct, 0],
      [wavesProduct, 2],
      [mountainsProduct, 0],
    ];
    renderCart(initialCartItems);

    expect(
      screen.queryByRole("heading", { name: flowersProduct.title }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: mountainsProduct.title }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: wavesProduct.title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton")).toHaveLength(1);
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    expect(screen.getAllByRole("button", { name: "Delete" })).toHaveLength(1);
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();

    const totalItemsRow = screen.getByText("Total items").parentElement;
    expect(within(totalItemsRow).getByText("2 items")).toBeInTheDocument();
    const subtotalRow = screen.getByText("Subtotal").parentElement;
    expect(within(subtotalRow).getByText("£50")).toBeInTheDocument();
    const taxesRow = screen.getByText("Taxes").parentElement;
    expect(within(taxesRow).getByText("£10")).toBeInTheDocument();
    const discountRow = screen.getByText("Discount").parentElement;
    expect(within(discountRow).getByText("£0")).toBeInTheDocument();
    const finalPaymentRow = screen.getByText("Final payment").parentElement;
    expect(within(finalPaymentRow).getByText("£60")).toBeInTheDocument();
  });
  it("removes only the selected item and updates summary totals when Delete is clicked", async () => {
    const initialCartItems = [
      [flowersProduct, 2],
      [wavesProduct, 3],
    ];
    const user = userEvent.setup();
    renderCart(initialCartItems);

    expect(
      screen.getByRole("heading", { name: flowersProduct.title }),
    ).toBeInTheDocument();
    await user.click(screen.getAllByRole("button", { name: "Delete" })[0]);

    expect(
      screen.queryByRole("heading", { name: flowersProduct.title }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: wavesProduct.title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Delete" })).toHaveLength(1);
    expect(screen.getAllByRole("spinbutton")).toHaveLength(1);
    expect(screen.getByRole("spinbutton")).toHaveValue(3);
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();

    const totalItemsRow = screen.getByText("Total items").parentElement;
    expect(within(totalItemsRow).getByText("3 items")).toBeInTheDocument();
    const subtotalRow = screen.getByText("Subtotal").parentElement;
    expect(within(subtotalRow).getByText("£75")).toBeInTheDocument();
    const taxesRow = screen.getByText("Taxes").parentElement;
    expect(within(taxesRow).getByText("£15")).toBeInTheDocument();
    const discountRow = screen.getByText("Discount").parentElement;
    expect(within(discountRow).getByText("£0")).toBeInTheDocument();
    const finalPaymentRow = screen.getByText("Final payment").parentElement;
    expect(within(finalPaymentRow).getByText("£90")).toBeInTheDocument();
  });
  it("hides the item and updates summary totals when its quantity is set to zero", async () => {
    const initialCartItems = [
      [flowersProduct, 2],
      [wavesProduct, 3],
    ];
    const user = userEvent.setup();
    renderCart(initialCartItems);

    const input = screen.getAllByRole("spinbutton")[0];
    await user.clear(input);
    await user.type(input, "0");
    await user.tab();

    expect(
      screen.queryByRole("heading", { name: flowersProduct.title }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: wavesProduct.title }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton")).toHaveLength(1);
    expect(screen.getByRole("spinbutton")).toHaveValue(3);
    expect(screen.getAllByRole("button", { name: "Delete" })).toHaveLength(1);
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();

    const totalItemsRow = screen.getByText("Total items").parentElement;
    expect(within(totalItemsRow).getByText("3 items")).toBeInTheDocument();
    const subtotalRow = screen.getByText("Subtotal").parentElement;
    expect(within(subtotalRow).getByText("£75")).toBeInTheDocument();
    const taxesRow = screen.getByText("Taxes").parentElement;
    expect(within(taxesRow).getByText("£15")).toBeInTheDocument();
    const discountRow = screen.getByText("Discount").parentElement;
    expect(within(discountRow).getByText("£0")).toBeInTheDocument();
    const finalPaymentRow = screen.getByText("Final payment").parentElement;
    expect(within(finalPaymentRow).getByText("£90")).toBeInTheDocument();
  });
  it("updates summary totals when an item's quantity changes to another positive value", async () => {
    const initialCartItems = [
      [flowersProduct, 2],
      [wavesProduct, 3],
    ];
    const user = userEvent.setup();
    renderCart(initialCartItems);

    const input = screen.getAllByRole("spinbutton")[0];
    await user.clear(input);
    await user.type(input, "4");
    await user.tab();

    expect(
      screen.getByRole("heading", { name: flowersProduct.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: wavesProduct.title }),
    ).toBeInTheDocument();
    const quantityInputs = screen.getAllByRole("spinbutton");
    expect(quantityInputs).toHaveLength(2);
    expect(quantityInputs[0]).toHaveValue(4);
    expect(quantityInputs[1]).toHaveValue(3);

    const totalItemsRow = screen.getByText("Total items").parentElement;
    expect(within(totalItemsRow).getByText("7 items")).toBeInTheDocument();
    const subtotalRow = screen.getByText("Subtotal").parentElement;
    expect(within(subtotalRow).getByText("£115")).toBeInTheDocument();
    const taxesRow = screen.getByText("Taxes").parentElement;
    expect(within(taxesRow).getByText("£23")).toBeInTheDocument();
    const discountRow = screen.getByText("Discount").parentElement;
    expect(within(discountRow).getByText("£0")).toBeInTheDocument();
    const finalPaymentRow = screen.getByText("Final payment").parentElement;
    expect(within(finalPaymentRow).getByText("£138")).toBeInTheDocument();
  });
});
