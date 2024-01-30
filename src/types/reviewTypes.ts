export type Review = {
  _id: string;
  movie: {
    _id: string;
    title: string;
    posterUrl: string;
    director: string;
    description: string;
  };
  writer: {
    _id: string;
    username: string;
  };
  content: string;
  rating: number;
  createdAt: string;
};
