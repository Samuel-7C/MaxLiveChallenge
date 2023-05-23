interface Artist {
  id: string;
  name: string;
  image: string;
  genres: Genre[];
  popularity?: number;
}

export type Genre = {
  id: string;
  name: string;
  is_primary: number;
};

export default Artist;
