import React, { SyntheticEvent, useState } from "react";
import logo from "../logo.svg";
import request from "../hooks/request";
import { EndPoints } from "../constants";

function debounce(func: any, timeout = 300) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //@ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}

function ArtistSearch() {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState();

  const onUserInput = (event: any) => {
    const value = event.target.value;
    setQuery(value);
    debounce(async() => await request(EndPoints.GENRES, value), 300);
  };

  return (
    <div className="w-full h-full text-slate-50 py-36 px-28	">
      <div className="w-full h-2/6 rounded-lg mb-3 flex flex-col justify-center items-center bg-gray-700">
        <label className="w-10/12 text-2xl font-medium" htmlFor="genre">
          Search Artist by Genre
        </label>
        <input
          type="text"
          className="h-9 w-10/12 px-2 rounded-lg my-3"
          id="genre"
          name="genreInput"
          value={query}
          onChange={onUserInput}
        />
      </div>
      <div className="w-full h-80 flex flex-wrap justify-center items-start "></div>
    </div>
  );
}

export default ArtistSearch;
