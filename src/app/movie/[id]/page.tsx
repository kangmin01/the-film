"use client";

import MovieCard from "@/components/MovieCard";
import { SearchMovie } from "@/types/movieTypes";
import useSWR from "swr";
import NotFound from "./not-found";
import MovieActivity from "@/components/MovieActivity";

type Props = {
  params: { id: string };
};

export default function MovieDetialPage({ params: { id } }: Props) {
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<SearchMovie>(`/api/movie/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (error || !movie) {
    return NotFound();
  }

  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-[1100px] my-20">
        {movie && <MovieCard movie={movie} />}
      </div>
      <MovieActivity reviews={movie.reviews} discussions={movie.discussions} />
    </section>
  );
}
