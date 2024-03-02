"use client";

import MovieCard from "@/components/MovieCard";
import { SearchMovie } from "@/types/movieTypes";
import useSWR from "swr";
import NotFound from "./not-found";
import MovieActivity from "@/components/MovieActivity";
import ClipSpinner from "@/components/ClipSpinner";

type Props = {
  params: { id: string };
};

export default function MovieDetialPage({ params: { id } }: Props) {
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<SearchMovie>(`/api/movie/${id}`);

  if (error) {
    return NotFound();
  }

  return (
    <section className="w-full flex flex-col items-center">
      {isLoading && (
        <div className="text-center mt-32">
          <ClipSpinner />
        </div>
      )}
      <div className="w-[1100px] my-20">
        {movie && <MovieCard movie={movie} />}
      </div>
      {movie && (
        <MovieActivity
          reviews={movie.reviews}
          discussions={movie.discussions}
        />
      )}
    </section>
  );
}
