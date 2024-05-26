import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyles from "./GlobalStyles.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout.tsx";
import Home from "./Pages/Home.tsx";
import Shopping from "./Pages/Shopping.tsx";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalStyles />

    <RouterProvider router={router} />
  </React.StrictMode>
);
