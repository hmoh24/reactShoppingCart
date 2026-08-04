import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Products from "./pages/products/Products";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import App from "./App";
import productsLoader from "./pages/products/productsLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: Home },
      {
        path: "products/:pageNumber",
        loader: async ({ params }) => {
          return { productsFetch: await productsLoader(params.pageNumber) };
        },
        Component: Products,
      },
      { path: "cart", Component: Cart },
    ],
  },
]);
