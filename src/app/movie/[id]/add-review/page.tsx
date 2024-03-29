"use client";

import { SearchMovie } from "@/types/movieTypes";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Rating } from "react-simple-star-rating";
import useSWR from "swr";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function AddReviewPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const { data: movie, error } = useSWR<SearchMovie>(`/api/movie/${id}`);
  const [rating, setRating] = useState(5);

  if (error) return <div>Error loading data</div>;
  if (!movie) return <div>Loading...</div>;

  const handleRating = (rate: number) => {
    setRating(rate * 2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set("rating", rating.toString());
      formData.set("movie", movie._id.toString());
      formData.set("writer", user.id);

      const response = await fetch("/api/movie/add-review", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/reviews");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <section className="flex flex-col items-center mt-16">
      <h1 className="text-4xl text-center font-bold">{movie.title}</h1>
      <h3 className="text-xl text-center mt-4 text-neutral-500">
        {movie.director}
      </h3>
      <Image
        className="mt-8"
        src={movie.posterUrl}
        alt={movie.title}
        width={160}
        height={190}
      />
      <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8">
        <Rating
          initialValue={2.5}
          onClick={handleRating}
          SVGstyle={{ display: "inline" }}
          allowFraction={true}
        />
        <div>
          <span>{rating}</span>
        </div>
        <textarea
          className="outline-none border border-c1 rounded-xl p-2 mt-8"
          name="content"
          placeholder="Write a review of the movie"
          cols={60}
          rows={6}
        ></textarea>
        <button className="bg-c2 rounded-xl px-20 py-2.5 text-2xl font-bold text-white mt-12">
          Create
        </button>
      </form>
    </section>
  );
}
