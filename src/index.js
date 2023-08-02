import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TagPage from "./pages/TagPage/TagPage";
import PostPage from "./pages/PostPage/PostPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import { Provider } from "react-redux";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

import NewPostForm from "./pages/PostPage/NewPostForm/NewPostForm";
import EditPostForm from "./pages/PostPage/EditPostForm/EditPostForm";
import store from "./redux/store";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <PostPage />,
      },
      {
        path: "/posts/new",
        element: <NewPostForm />,
      },
      {
        path: "/posts/:postId/edit",
        element: <EditPostForm />,
      },
      {
        path: "/tags",
        element: <TagPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
