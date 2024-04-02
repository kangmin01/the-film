"use client";

import NotFound from "@/app/user/[username]/not-found";
import ClipSpinner from "@/components/ClipSpinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import useSWR, { useSWRConfig } from "swr";

type Props = {
  params: { id: string };
};

export default function EditReviewPage({ params: { id } }: Props) {
  const {
    data: review,
    isLoading,
    error,
  } = useSWR(`/api/review/${id}/edit-review`);

  const router = useRouter();

  const { mutate } = useSWRConfig();

  const [rating, setRating] = useState(1);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setContent(review.content);
    }
  }, [review]);

  if (error) {
    return NotFound();
  }

  const handleRating = (rate: number) => {
    setRating(rate * 2);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set("rating", rating.toString());

      const response = await fetch(`/api/review/${id}/edit-review`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        await mutate("/api/reviews");

        router.back();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col items-center mt-16">
      {isLoading && (
        <div className="text-center mt-32">
          <ClipSpinner />
        </div>
      )}
      {review && (
        <>
          <h1 className="text-4xl text-center font-bold">
            {review.movie.title}
          </h1>
          <h3 className="text-xl text-center mt-4 text-neutral-500">
            {review.movie.director}
          </h3>
          <Image
            className="mt-8"
            src={review.movie.posterUrl}
            alt={review.movie.title}
            width={160}
            height={190}
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-8"
          >
            <Rating
              initialValue={review.rating / 2}
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
              value={content}
              cols={60}
              rows={6}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button className="bg-c2 rounded-xl px-20 py-2.5 text-2xl font-bold text-white mt-12">
              Create
            </button>
          </form>
        </>
      )}
    </section>
  );
}
