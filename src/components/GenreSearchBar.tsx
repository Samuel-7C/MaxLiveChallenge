import { useState } from "react";

function GenreSearchBar<T extends (...args: any) => any>({
  onSearch,
  genres,
  onGenreClick,
}: {
  onSearch: T;
  genres: Array<any> | undefined;
  onGenreClick: (...args: any) => Promise<void>;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [showAutocomplete, setShowAutoComplete] = useState(true);
  return (
    <div className="w-full h-2/6 ">
      <div className="w-full h-full rounded-lg mb-3 flex flex-col justify-center items-center bg-gray-700">
        <label className="w-10/12 text-2xl font-medium" htmlFor="genre">
          Search Artist by Genre
        </label>
        <input
          type="text"
          className="h-9 text-black w-10/12 px-2 rounded-lg my-3"
          id="genre"
          name="genreInput"
          onChange={(ev) => {
            setSearchValue(ev.target.value);
            setShowAutoComplete(true);
            onSearch(ev);
          }}
          value={searchValue}
        />
        <div className="w-full relative">
          {showAutocomplete && (
            <div
              className={`absolute border-2 left-20 border-white bg-white text-black	z-10 top-full	${
                !genres && "collapse hidden"
              }`}
            >
              {genres &&
                genres.map((item) => (
                  <div
                    onClick={() => {
                      setSearchValue(item.name);
                      setShowAutoComplete(false);
                      onGenreClick(item.id);
                    }}
                    key={item.id}
                    className="hover:bg-sky-700"
                  >
                    {item.name}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GenreSearchBar;
