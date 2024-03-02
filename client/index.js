import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import ErrorPage from "./components/ErrorPage";
import MyMovies from './components/MyMovies'
import { createBrowserRouter, RouterProvider, Link} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mymovies",
        element: <MyMovies />,
      },
    ],
  },
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);