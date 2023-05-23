import { EndPoints } from "./constants";
import Artist, { Genre } from "./entities/artist";
import request from "./services/request";

export const getPrimaryGenre = (genres: Genre[]) =>
  genres.find((genre) => genre.is_primary);

export const saveArtistToLocalStorage = (artist: Artist) => {
  const savedItems = window.localStorage.getItem("artists");
  const parsedItems = !!savedItems ? JSON.parse(savedItems) : {};
  parsedItems[artist.id] = artist;
  window.localStorage.setItem("artists", JSON.stringify(parsedItems));
};

export const removeArtistFromLocalStorage = (id: string) => {
  const parsedItems = JSON.parse(window.localStorage.getItem("artists") || "");
  delete parsedItems[id];
  window.localStorage.setItem("artists", JSON.stringify(parsedItems));
};

export const getSavedArtistsFromLocalStorage = () => {
  const savedArtists = window.localStorage.getItem("artists");
  return savedArtists ? JSON.parse(savedArtists) : {};
};

export const loaders = {
  getArtistDetails: async ({ params }: { params: any }) => {
    const detail: Promise<Artist> = request(`${EndPoints.ARTIST}${params.id}`);
    const relatedArtists: Promise<Array<Artist>> = request(
      `${EndPoints.ARTIST}${params.id}/similar`
    );
    const res = await Promise.all([detail, relatedArtists]);
    return { detail: res[0], relatedArtists: res[1] };
  },
  getSavedList: (): Artist[] => {
    const artists = getSavedArtistsFromLocalStorage();
    return Object.keys(artists).map((key) => artists[key]);
  },
};
