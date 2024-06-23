import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./GlobalStyles.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout.tsx";
import Home from "./Pages/Home.tsx";
import Shopping from "./Pages/Shopping.tsx";
import { Provider } from "react-redux";
import store from "./Redux/store.ts";
import Cart from "./Pages/Cart.tsx";
import Wishlist from "./Pages/Wishlist.tsx";
import RegisterLogin from "./Pages/RegisterLogin.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Shopping/:page",
        element: <Shopping />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/Wishlist",
        element: <Wishlist />,
      },
    ],
  },
  {
    path: "/:LoginRegister",
    element: <RegisterLogin />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
