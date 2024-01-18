"use client";

import MovieCard from "@/components/MovieCard";
import { SearchMovie } from "@/types/movieTypes";
import useSWR from "swr";
import NotFound from "./not-found";

type Props = {
  params: { id: string };
};

export default function MovieDetialPage({ params: { id } }: Props) {
  // url에서 id를 받아와 해당 id에 해당하는 모든 영화 정보를 가져오기
  const { data: movie } = useSWR<SearchMovie>(`/api/movie/${id}`);

  if (!movie) {
    return NotFound();
  }

  return (
    <section>
      <div>
        <MovieCard movie={movie} />
      </div>
      <div>{/* 리뷰, 토론 */}</div>
    </section>
  );
}
