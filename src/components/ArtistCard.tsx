import { memo } from "react";
import Artist from "../entities/artist";

interface Params extends Artist {
  addList: () => void;
}

function ArtistCard({ name, imageSrc, primaryGenre, addList }: Params) {
  return (
    <>
      <div className="w-full h-2/6 rounded-lg my-1 flex justify-between p-2 bg-gray-700">
        <img className="rounded" src={imageSrc} alt="Img" />
        <div className="flex flex-col justify-center">
          <h2 className=" font-bold  text-lg">{name}</h2>
          <p>{primaryGenre}</p>
        </div>
        <button
          onClick={addList}
          className=" bg-sky-950 font-bold w-3/12 rounded-lg h-10 self-center"
        >
          Add Artist
        </button>
      </div>
    </>
  );
}

export default memo(ArtistCard);
