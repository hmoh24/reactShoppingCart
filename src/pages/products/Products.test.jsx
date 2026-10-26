import { describe, expect, it } from "vitest";
import Products from "./Products";
import App from "../../App";
import { createMemoryRouter, RouterProvider } from "react-router";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import productCardStyles from "../../components/productCard/ProductCard.module.css";

function renderProducts(
  productCount,
  initialPage,
  loadingState = false,
  loadTime = 0,
  initialPageLoad = false,
) {
  function createProduct(id) {
    return {
      objectID: id,
      title: `Product ${id}`,
      period: "Edo period",
      primaryImage: "/painting.jpg",
      artistDisplayName: "Test Artist",
    };
  }

  const products = [];
  for (let id = 1; id <= productCount; id++) {
    products.push(createProduct(id));
  }

  const paginatedProducts = new Map();
  for (let i = 0; i < products.length; i++) {
    if (i % 12 === 0) {
      paginatedProducts.set(i / 12 + 1, [products[i]]);
      continue;
    }
    let current = paginatedProducts.get(Math.trunc(i / 12) + 1);
    current.push(products[i]);
    paginatedProducts.set(Math.trunc(i / 12) + 1, current);
  }

  async function testProductsLoader(pageNumber) {
    const currentPageData = {
      productData: paginatedProducts.get(Number(pageNumber)) ?? [],
      pageTotal: Math.ceil(products.length / 12),
    };

    if (loadingState && Number(pageNumber) !== initialPage) {
      if (loadTime) {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(currentPageData);
          }, loadTime);
        });
      }
      return new Promise(() => {});
    }
    if (loadingState && Number(pageNumber) === initialPage && initialPageLoad) {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(currentPageData);
        }, loadTime);
      });
    }

    return currentPageData;
  }

  const router = createMemoryRouter(
    [
      {
        path: "/",
        Component: App,
        children: [
          {
            path: "products/:pageNumber",
            loader: async ({ params }) => {
              return {
                productsFetch: await testProductsLoader(params.pageNumber),
              };
            },
            Component: Products,
          },
        ],
      },
    ],
    { initialEntries: [`/products/${initialPage}`] },
  );
  return render(<RouterProvider router={router} />);
}

describe("Products", () => {
  it("shows the page heading and product cards for 12 loaded products", async () => {
    renderProducts(12, 1);

    expect(
      await screen.findByRole("heading", { name: "Products", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(12);
    for (let id = 1; id <= 12; id++) {
      expect(
        screen.getByRole("heading", { name: `Product ${id}`, level: 2 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: `Product ${id} by Test Artist` }),
      ).toHaveAttribute("src", "/painting.jpg");
    }
    expect(screen.getAllByText("Edo period")).toHaveLength(12);
    expect(screen.getAllByRole("button", { name: "Add to Cart" })).toHaveLength(
      12,
    );
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByText("Next")).toHaveAttribute("aria-disabled", "true");
  });
  it("shows all loaded product cards when there are fewer than 12 products", async () => {
    renderProducts(5, 1);

    expect(
      await screen.findByRole("heading", { name: "Products", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(5);
    for (let id = 1; id <= 5; id++) {
      expect(
        screen.getByRole("heading", { name: `Product ${id}`, level: 2 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: `Product ${id} by Test Artist` }),
      ).toHaveAttribute("src", "/painting.jpg");
    }
    expect(screen.getAllByText("Edo period")).toHaveLength(5);
    expect(screen.getAllByRole("button", { name: "Add to Cart" })).toHaveLength(
      5,
    );
    expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
  });
  it("shows the page heading and no product cards when no products are loaded", async () => {
    renderProducts(0, 1);

    expect(
      await screen.findByRole("heading", { name: "Products", level: 1 }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /^Product \d+ by Test Artist$/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add to Cart" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Previous")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByText("Next")).toHaveAttribute("aria-disabled", "true");
  });
  it("shows 12 loading placeholders while navigation is loading", async () => {
    const user = userEvent.setup();
    const { container } = renderProducts(24, 1, true);

    expect(
      await screen.findByRole("heading", { name: "Product 1", level: 2 }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Next" }));

    await waitFor(() => {
      expect(
        container.querySelectorAll(`.${productCardStyles.loadingState}`),
      ).toHaveLength(12);
      expect(
        container.querySelectorAll(`.${productCardStyles.spinner}`),
      ).toHaveLength(12);
    });
    expect(
      screen.queryByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Add to Cart" }),
    ).not.toBeInTheDocument();
  });
  it("replaces loading placeholders with loaded product cards when navigation completes", async () => {
    const user = userEvent.setup();
    const { container } = renderProducts(24, 1, true, 100);

    expect(
      await screen.findByRole("heading", { name: "Product 1", level: 2 }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Next" }));

    await waitFor(() => {
      expect(
        container.querySelectorAll(`.${productCardStyles.loadingState}`),
      ).toHaveLength(12);
      expect(
        container.querySelectorAll(`.${productCardStyles.spinner}`),
      ).toHaveLength(12);
    });

    await waitForElementToBeRemoved(
      () => container.querySelector(`.${productCardStyles.loadingState}`),
      { timeout: 2000 },
    );
    for (let id = 13; id <= 24; id++) {
      expect(
        screen.getByRole("heading", { name: `Product ${id}`, level: 2 }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: `Product ${id} by Test Artist` }),
      ).toHaveAttribute("src", "/painting.jpg");
    }
  });
  describe("page numbers", () => {
    it("shows Page 1 of 3 when starting on the first page", async () => {
      renderProducts(36, 1);
      expect(await screen.findByText("Page 1 of 3")).toBeInTheDocument();
    });
    it("shows Page 2 of 3 when starting on the second page", async () => {
      renderProducts(36, 2);
      expect(await screen.findByText("Page 2 of 3")).toBeInTheDocument();
    });
    it("shows Page 3 of 3 when starting on the last page", async () => {
      renderProducts(36, 3);
      expect(await screen.findByText("Page 3 of 3")).toBeInTheDocument();
    });
  });
  it("does not navigate or trigger loading when Previous is clicked on the first page", async () => {
    const user = userEvent.setup();
    const { container } = renderProducts(36, 1, true, 250, true);

    expect(
      await screen.findByRole("heading", { name: "Product 1", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(12);
    expect(
      screen.queryByRole("link", { name: "Previous" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Previous")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    await user.click(screen.getByText("Previous"));

    expect(
      container.querySelector(`.${productCardStyles.spinner}`),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${productCardStyles.loadingState}`),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 1", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(12);
  });
  it("does not navigate or trigger loading when Next is clicked on the last page", async () => {
    const user = userEvent.setup();
    const { container } = renderProducts(36, 3, true, 250, true);

    expect(
      await screen.findByRole("heading", { name: "Product 25", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(12);
    expect(
      screen.queryByRole("link", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toHaveAttribute("aria-disabled", "true");
    await user.click(screen.getByText("Next"));

    expect(
      container.querySelector(`.${productCardStyles.spinner}`),
    ).not.toBeInTheDocument();
    expect(
      container.querySelector(`.${productCardStyles.loadingState}`),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Page 3 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 25", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(12);
  });
  it("does not navigate or trigger loading when Previous or Next is clicked with only one page", async () => {
    const user = userEvent.setup();
    const { container } = renderProducts(12, 1, true, 250, true);

    expect(
      await screen.findByRole("heading", { name: "Product 1", level: 2 }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
    ).toHaveLength(12);

    for (const linkName of ["Previous", "Next"]) {
      expect(
        screen.queryByRole("link", { name: linkName }),
      ).not.toBeInTheDocument();
      expect(screen.getByText(linkName)).toHaveAttribute(
        "aria-disabled",
        "true",
      );
      await user.click(screen.getByText(linkName));
      expect(
        container.querySelector(`.${productCardStyles.spinner}`),
      ).not.toBeInTheDocument();
      expect(
        container.querySelector(`.${productCardStyles.loadingState}`),
      ).not.toBeInTheDocument();
      expect(screen.getByText("Page 1 of 1")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: "Product 1", level: 2 }),
      ).toBeInTheDocument();
      expect(
        screen.getAllByRole("heading", { name: /^Product \d+$/, level: 2 }),
      ).toHaveLength(12);
    }
  });
  it("navigates to the previous page when Previous is clicked within the page range", async () => {
    const user = userEvent.setup();
    renderProducts(36, 3);

    expect(await screen.findByText("Page 3 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 25" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Previous" }));
    expect(await screen.findByText("Page 2 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 13" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Product 25" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Previous" }));
    expect(await screen.findByText("Page 1 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 1" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Product 13" }),
    ).not.toBeInTheDocument();
  });
  it("navigates to the next page when Next is clicked within the page range", async () => {
    const user = userEvent.setup();
    renderProducts(36, 1);

    expect(await screen.findByText("Page 1 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 1" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("link", { name: "Next" }));
    expect(await screen.findByText("Page 2 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 13" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Product 1" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Next" }));
    expect(await screen.findByText("Page 3 of 3")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Product 25" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Product 13" }),
    ).not.toBeInTheDocument();
  });
});
