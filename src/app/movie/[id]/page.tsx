"use client";

import MovieCard from "@/components/MovieCard";
import { SearchMovie } from "@/types/movieTypes";
import useSWR from "swr";
import NotFound from "./not-found";
import Button from "@/components/Button";
import { usePathname } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function MovieDetialPage({ params: { id } }: Props) {
  const {
    data: movie,
    isLoading,
    error,
  } = useSWR<SearchMovie>(`/api/movie/${id}`);

  const pathname = usePathname();

  if (!isLoading && error && !movie) {
    return NotFound();
  }

  return (
    <section>
      <div>{movie && <MovieCard movie={movie} />}</div>
      <Button text="Write" src={`${pathname}/add-review`} />
      <div>{/* 리뷰, 토론 */}</div>
    </section>
  );
}
