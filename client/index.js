import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import ErrorPage from "./components/ErrorPage";
import MyMoviesContainer from "./components/MyMoviesContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from './utils/store'
import { Provider } from "react-redux";
import Home from "./components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mymovies",
        element: <MyMoviesContainer />,
      },
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
