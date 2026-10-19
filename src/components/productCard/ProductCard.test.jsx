import { describe, expect, it } from "vitest";
import ProductCard from "./ProductCard";
import styles from "./ProductCard.module.css";
import { render, screen } from "@testing-library/react";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
import { MAX_CART_QUANTITY, MIN_CART_QUANTITY } from "../../constants/cart";

describe("Components - ProductCard", () => {
  const productData = {
    id: 1,
    title: "Purple Flowers",
    description: "A flower painting.",
    imageURL: "/flowers.jpg",
    imageAltText: "Purple flowers",
  };
  it("shows a spinner while loading", () => {
    const initialCartItems = [[productData, 0]];
    const { container } = render(
      <ProductCard
        productData={productData}
        cartItems={initialCartItems}
        setCartItems={() => {}}
        loadingState="loading"
      />,
    );

    expect(
      container.querySelector(`.${styles.loadingState}`),
    ).toBeInTheDocument();
    expect(container.querySelector(`.${styles.spinner}`)).toBeInTheDocument();
  });
  it("shows product details and Add to Cart when quantity is zero", () => {
    const initialCartItems = [[productData, 0]];
    render(
      <ProductCard
        productData={productData}
        cartItems={initialCartItems}
        setCartItems={() => {}}
        loadingState="idle"
      />,
    );
    expect(
      screen.getByRole("heading", {
        name: productData.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: productData.imageAltText,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: productData.imageAltText,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(productData.description)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Add to Cart/i,
      }),
    ).toBeInTheDocument();
  });
  it("shows product details, quantity, and plus and minus buttons when quantity is positive", () => {
    const initialCartItems = [[productData, 2]];
    render(
      <ProductCard
        productData={productData}
        cartItems={initialCartItems}
        setCartItems={() => {}}
        loadingState="idle"
      />,
    );
    expect(
      screen.getByRole("heading", {
        name: productData.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: productData.imageAltText,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: productData.imageAltText,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(productData.description)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /-/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /^\+$/,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });
  it("replaces quantity controls with Add to Cart when quantity decreases from 1 to 0", async () => {
    const initialCartItems = [[productData, 1]];

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    await userEvent.click(
      screen.getByRole("button", {
        name: /-/i,
      }),
    );
    expect(
      screen.queryByRole("button", {
        name: /-/i,
      }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /^\+$/,
      }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Add to Cart/i,
      }),
    ).toBeInTheDocument();
  });
  it("increases quantity when the plus button is clicked", async () => {
    const initialCartItems = [[productData, 1]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    await user.click(screen.getByRole("button", { name: /^\+$/ }));
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    await user.click(screen.getByRole("button", { name: /^\+$/ }));
    expect(screen.getByRole("spinbutton")).toHaveValue(3);
  });
  it("decreases quantity when the minus button is clicked", async () => {
    const initialCartItems = [[productData, 3]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    expect(screen.getByRole("spinbutton")).toHaveValue(3);
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });
  it("commits a valid typed quantity when the input loses focus", async () => {
    const initialCartItems = [[productData, 1]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "5");
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });
  it("sets quantity to the maximum when a typed value exceeds the limit", async () => {
    const initialCartItems = [[productData, 1]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, String(MAX_CART_QUANTITY + 1));
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(MAX_CART_QUANTITY);
  });
  it("sets quantity to the minimum when a typed value is below the limit", async () => {
    const initialCartItems = [[productData, 1]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, String(MIN_CART_QUANTITY - 1));
    await user.tab();
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add to Cart/i }),
    ).toBeInTheDocument();
  });
  it("keeps quantity at the maximum when the plus button is clicked", async () => {
    const initialCartItems = [[productData, MAX_CART_QUANTITY]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    await user.click(screen.getByRole("button", { name: /^\+$/ }));
    expect(screen.getByRole("spinbutton")).toHaveValue(MAX_CART_QUANTITY);
    await user.click(screen.getByRole("button", { name: /^\+$/ }));
    expect(screen.getByRole("spinbutton")).toHaveValue(MAX_CART_QUANTITY);
  });
  it("adds a missing product at quantity 1 and shows quantity controls when Add to Cart is clicked", async () => {
    const initialCartItems = [];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    await user.click(screen.getByRole("button", { name: /Add to Cart/i }));
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Add to Cart/i }),
    ).not.toBeInTheDocument();
  });
  it("shows quantity controls at 1 when Add to Cart is clicked for an existing zero-quantity product", async () => {
    const initialCartItems = [[productData, 0]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    await user.click(screen.getByRole("button", { name: /Add to Cart/i }));
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Add to Cart/i }),
    ).not.toBeInTheDocument();
  });
  it("restores the previous quantity when an empty input loses focus", async () => {
    const initialCartItems = [[productData, 3]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    await user.clear(screen.getByRole("spinbutton"));
    expect(screen.getByRole("spinbutton")).toHaveValue(null);
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(3);
  });
  it("commits the typed quantity when Enter is pressed", async () => {
    const initialCartItems = [[productData, 1]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "5{Enter}");
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
    expect(screen.getByRole("spinbutton")).not.toHaveFocus();
    await user.clear(screen.getByRole("spinbutton"));
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });
  it("increases and decreases from the typed quantity when the plus and minus buttons are clicked one after the other", async () => {
    const initialCartItems = [[productData, 1]];
    const user = userEvent.setup();

    function TestProductCard() {
      const [cartItems, setCartItems] = useState(initialCartItems);

      return (
        <ProductCard
          productData={productData}
          cartItems={cartItems}
          setCartItems={setCartItems}
          loadingState="idle"
        />
      );
    }
    render(<TestProductCard />);

    const input = screen.getByRole("spinbutton");
    await user.clear(input);
    await user.type(input, "5");
    await user.tab();
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(6);
    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(5);
  });
});
