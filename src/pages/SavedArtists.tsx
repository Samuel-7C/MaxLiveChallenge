import { useState } from "react";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import ArtistList from "../components/ArtistList";
import Artist from "../entities/artist";

function SavedArtists() {
  const artistList = useLoaderData();

  const [artists, setArtists] = useState<Artist[]>(artistList as Array<Artist>);

  const removeArtist = (index: number) => {
    setArtists((prev: any) => {
      return prev.toSpliced(index, 1);
    });
  };

  return (
    <>
      <button className="bg-sky-800 rounded-lg px-2 m-2">
        <Link to="/"> back to search</Link>
      </button>
      <h1 className="text-center text-5xl">My List</h1>
      {artists && artists?.length > 0 ? (
        <div className="w-full h-4/6    overflow-y-auto">
          {<ArtistList removeArtist={removeArtist} artists={artists} />}
        </div>
      ) : (
        <h2 className="text-center mt-16  text-2xl">No Artists in List</h2>
      )}
    </>
  );
}

export default SavedArtists;
