import { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import ArtistList from "../components/ArtistList";
import {
  getPrimaryGenre,
  getSavedArtistsFromLocalStorage,
  removeArtistFromLocalStorage,
  saveArtistToLocalStorage,
} from "../utils";
import Artist from "../entities/artist";

function ArtistDetail() {
  const { detail, relatedArtists } = useLoaderData() as {
    detail: [Artist];
    relatedArtists: Artist[];
  };
  const artistDetail = detail[0];

  const [savedItems, setSavedItems] = useState<any>(
    getSavedArtistsFromLocalStorage()
  );
  const saveItem = (artist: Artist) => {
    setSavedItems((prev: {}) => ({ ...prev, [artist.id]: artist }));
    saveArtistToLocalStorage(artist);
  };

  const remove = (id: string) => {
    setSavedItems(({ [id as keyof object]: removed, ...newItems }) => ({
      ...newItems,
    }));
    removeArtistFromLocalStorage(id);
  };

  return (
    <>
      <div className="flex justify-between">
        <button className="bg-sky-800 rounded-lg px-2 m-2">
          <Link to="/"> back to search</Link>
        </button>
        <button className="bg-sky-800 rounded-lg px-2 m-2">
          <Link to="/list">View my list</Link>
        </button>
      </div>
      <div className="w-full h-fit rounded-lg bg-gray-700">
        <div className=" flex  justify-between px-8 py-4 ">
          <img className="w-32 rounded" src={artistDetail?.image} alt="Img" />
          <div className="flex flex-col pl-8 grow justify-start ">
            <h2 className=" font-bold  text-lg">{artistDetail?.name}</h2>
            <p>
              Primary Genre:{" "}
              {artistDetail && getPrimaryGenre(artistDetail?.genres)?.name}
            </p>
            <p>Popularity score:{artistDetail?.popularity}</p>
          </div>
        </div>
        <div className="  flex  justify-between p-2 ">
          <div className=" px-4">
            <p>Aditional Genres:</p>
            <p>
              {artistDetail?.genres.map((genre) =>
                genre.is_primary ? genre.name : ""
              )}
            </p>
          </div>
          <button
            onClick={() => {
              savedItems && savedItems[artistDetail.id]
                ? remove(artistDetail.id)
                : saveItem(artistDetail);
            }}
            className=" bg-sky-950 font-bold w-3/12 rounded-lg h-10 self-center"
          >
            {savedItems && savedItems[artistDetail.id]
              ? "Remove"
              : "Add Artist"}
          </button>
        </div>
      </div>
      <h2 className="mt-12">Related Artists:</h2>
      <div className="w-full  h-[24rem] overflow-y-auto mt-2">
        {relatedArtists && <ArtistList artists={relatedArtists} />}
      </div>
    </>
  );
}

export default ArtistDetail;
