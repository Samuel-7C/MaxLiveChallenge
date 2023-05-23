import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ArtistDetail from "./pages/ArtistDetail";
import ArtistSearch from "./pages/ArtistsSearch";
import SavedArtists from "./pages/SavedArtists";
import { loaders } from "./utils";

let router = createBrowserRouter([
  {
    path: "/",
    element: <ArtistSearch />,
  },
  {
    path: "list",
    element: <SavedArtists />,
    loader: loaders.getSavedList,
  },
  {
    path: "artist/:id",
    element: <ArtistDetail />,
    loader: loaders.getArtistDetails,
  },
]);

export default function App() {
  return (
    <>
      <div className="bg-gray-600 text-slate-50 w-full h-full pt-14 min-[320px]:max-lg:px-4 px-44">
        <RouterProvider
          router={router}
          fallbackElement={<p className="text-white">Loading...</p>}
        />
      </div>
    </>
  );
}
