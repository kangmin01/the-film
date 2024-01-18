"use client";

import { SearchMovie } from "@/types/movieTypes";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import MovieCard from "./MovieCard";
import useDebounce from "@/hooks/debounce";
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const { data: movies } = useSWR<SearchMovie[]>(
    `/api/search/${debouncedKeyword}`
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="w-full px-10 pt-16">
      <form onSubmit={handleSubmit} className="mb-20 w-full">
        <div className="relative w-1/2 mx-auto">
          <input
            className="text-xl w-full p-4 border-b-2 border-neutral-400 outline-none"
            type="text"
            autoFocus
            placeholder="Search for a title or director"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <IoSearchOutline className="text-3xl text-neutral-700 absolute right-4 top-4 cursor-pointer" />
        </div>
      </form>
      <ul className="w-[860px] mx-auto">
        {movies &&
          movies.map((movie) => (
            <li
              className="px-4 py-6 mb-4 border border-neutral-300"
              key={movie._id}
            >
              <MovieCard movie={movie} />
            </li>
          ))}
      </ul>
      {movies?.length === 0 && (
        <span className="flex justify-center font-bold text-3xl bg-blue-50 p-4 rounded-lg">
          {"We don't have the movie you're looking for. Sorry. 😭"}
        </span>
      )}
    </section>
  );
}
