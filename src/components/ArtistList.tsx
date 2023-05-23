import { memo, useState } from "react";
import { Link } from "react-router-dom";
import Artist from "../entities/artist";
import {
  getPrimaryGenre,
  getSavedArtistsFromLocalStorage,
  removeArtistFromLocalStorage,
  saveArtistToLocalStorage,
} from "../utils";

type Params = {
  artists: Artist[];
  removeArtist?: (index: number) => void;
};

function ArtistList<T>({ artists, removeArtist = () => {} }: Params) {
  const [savedItems, setSavedItems] = useState<T | unknown>(
    getSavedArtistsFromLocalStorage()
  );

  const saveItem = (artist: Artist) => {
    setSavedItems((prev: T) => ({ ...prev, [artist.id]: artist }));
    saveArtistToLocalStorage(artist);
  };

  const remove = (id: string, index: number) => {
    setSavedItems(({ [id]: removed, ...newItems }) => ({
      ...newItems,
    }));
    removeArtistFromLocalStorage(id);
    removeArtist(index);
  };

  return (
    <>
      {artists &&
        artists.map((artist, index) => (
          <div
            key={artist.id}
            className="w-full h-2/6 rounded-lg my-1 flex justify-between p-2 bg-gray-700"
          >
            <img className="rounded" src={artist.image} alt="Img" />
            <div className="flex flex-col justify-center">
              <Link to={`/artist/${artist.id}`}>
                {" "}
                <h2 className=" font-bold  text-lg">{artist.name}</h2>
              </Link>
              <p>{getPrimaryGenre(artist.genres)?.name}</p>
            </div>
            <button
              onClick={() => {
                savedItems && savedItems[artist.id as keyof {}]
                  ? remove(artist.id, index)
                  : saveItem(artist);
              }}
              className=" bg-sky-950 font-bold w-3/12 rounded-lg h-10 self-center"
            >
              {savedItems && savedItems[artist.id as keyof {}]
                ? "Remove"
                : "Add Artist"}
            </button>
          </div>
        ))}
    </>
  );
}

export default memo(ArtistList);
