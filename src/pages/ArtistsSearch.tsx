import debounce from "lodash.debounce";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ArtistList from "../components/ArtistList";
import GenreSearchBar from "../components/GenreSearchBar";
import { EndPoints } from "../constants";
import request from "../services/request";
import { Link } from "react-router-dom";

function ArtistSearch() {
  const [genres, setGenres] = useState();
  const [artists, setArtists] = useState();

  useEffect(() => {
    return () => {
      debouncedInput.cancel();
    };
  });

  const onUserInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setGenres(undefined);
      return;
    }
    const res = await request(EndPoints.GENRES, `${value}&limit=20`);
    setGenres(res);
  };

  const debouncedInput = useMemo(() => {
    return debounce(onUserInput, 300);
  }, []);

  const getArtistsByGenre = async (genreId: string) => {
    const res = await request(`${EndPoints.GENRES}/${genreId}/artists`);
    setArtists(res);
  };

  return (
    <>
      <Link to="/list">
        <h2 className="my-2 text-right underline underline-offset-1	">View My List</h2>
      </Link>
      <GenreSearchBar
        genres={genres}
        onSearch={debouncedInput}
        onGenreClick={getArtistsByGenre}
      />
      <div className="w-full h-[28rem]  my-1   overflow-y-auto		">
        {artists && <ArtistList artists={artists} />}
      </div>
    </>
  );
}

export default ArtistSearch;
