import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  useOutletContext,
  RouterProvider,
} from "react-router";
import App from "./App";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("renders app shell on /", () => {
    function TestPage() {
      return <main>Test page content</main>;
    }

    const router = createMemoryRouter([
      {
        path: "/",
        Component: App,
        children: [{ index: true, Component: TestPage }],
      },
    ]);
    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("img", {
        name: /The Floating Archive logo/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Test page content")).toBeInTheDocument();

    expect(
      screen.getByText("Copyright © 2026 The Floating Archive."),
    ).toBeInTheDocument();
  });

  it("shows the global loading banner when navigating to products", async () => {
    function TestPage() {
      return <main>Test page content</main>;
    }

    let timer;
    async function testLoader() {
      let testPromise = new Promise(
        (resolve) =>
          (timer = setTimeout(() => {
            resolve("loaded");
          }, 10000)),
      );
      return testPromise;
    }

    const router = createMemoryRouter([
      {
        path: "/",
        Component: App,
        children: [
          {
            index: true,
            Component: TestPage,
          },
          {
            path: "products/:pageNumber",
            loader: testLoader,
            Component: TestPage,
          },
        ],
      },
    ]);
    render(<RouterProvider router={router} />);

    router.navigate("/products/1");
    const banner = await screen.findByRole("status");

    expect(banner).toBeInTheDocument();
    clearTimeout(timer);
  });
  it("hides the global loading banner during product pagination", async () => {
    function TestPage() {
      return <main>Test page content</main>;
    }

    let timer;
    async function testLoader() {
      let testPromise = new Promise(
        (resolve) =>
          (timer = setTimeout(() => {
            resolve("loaded");
          }, 10000)),
      );
      return testPromise;
    }

    const router = createMemoryRouter(
      [
        {
          path: "/",
          Component: App,
          children: [
            {
              path: "products/1",
              Component: TestPage,
            },
            {
              path: "products/2",
              loader: testLoader,
              Component: TestPage,
            },
          ],
        },
      ],
      { initialEntries: ["/products/1"] },
    );
    render(<RouterProvider router={router} />);

    router.navigate("/products/2");
    await waitFor(() => {
      expect(router.state.navigation.state).toBe("loading");
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    clearTimeout(timer);
  });
  it("cart total displayed on navbar after state update", async () => {
    const user = userEvent.setup();
    function TestPage() {
      const [cartItems, setCartItems] = useOutletContext();

      return (
        <button
          onClick={() =>
            setCartItems([
              [55867, 1],
              [40336, 1],
              [36108, 4],
            ])
          }
        >
          Add to cart
        </button>
      );
    }

    const router = createMemoryRouter([
      {
        path: "/",
        Component: App,
        children: [{ index: true, Component: TestPage }],
      },
    ]);
    render(<RouterProvider router={router} />);

    expect(screen.getByText("Cart (0)")).toBeInTheDocument();
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Cart (6)")).toBeInTheDocument();
  });
});
