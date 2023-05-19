import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import "./index.css";
import ArtistSearch from "./pages/ArtistsSearch";

let router = createBrowserRouter([
  {
    path: "/",
    loader: () => ({ message: "Hello Data Router!" }),
    element: <ArtistSearch />,

  },
  {
    path: "search",
    element: <ArtistSearch />,
  },
]);

export default function App() {
  return (
    <>
      <div className="bg-gray-600 w-full h-full">
        <RouterProvider
          router={router}
          fallbackElement={<p>Loading...</p>}
        />
      </div>
    </>
  );
}
