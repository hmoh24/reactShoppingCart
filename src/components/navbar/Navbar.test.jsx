import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  createMemoryRouter,
  useOutletContext,
  RouterProvider,
} from "react-router";
import { describe, expect, it } from "vitest";
import App from "../../App";

describe("Navbar", () => {
  it("displays the branding, navigation links, and cart count", () => {
    const router = createMemoryRouter([
      {
        path: "/",
        Component: App,
      },
    ]);
    render(<RouterProvider router={router} />);

    //logo img
    expect(
      screen.getByRole("img", {
        name: /The Floating Archive logo/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: /The Floating Archive logo/i,
      }),
    ).toHaveAttribute("href", "/");

    //nav links
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute(
      "href",
      "/products/1",
    );
    expect(screen.getByRole("link", { name: "Cart (0)" })).toHaveAttribute(
      "href",
      "/cart",
    );
  });
});
