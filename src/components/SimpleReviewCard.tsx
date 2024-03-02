"use client";

import { Review } from "@/types/reviewTypes";
import { parseDate } from "@/util/date";
import { Rating } from "react-simple-star-rating";
import ReviewActions from "./ReviewActions";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  review: Review;
  isOwner?: Boolean;
};

export default function SimpleReviewCard({
  isOwner,
  review: { _id, rating, content, createdAt, writer, movie },
}: Props) {
  const path = usePathname();
  const isMoviePage = path.includes("movie");

  const { data } = useSession();
  const sessionUser = data?.user;
  isOwner = writer.username === sessionUser?.username;

  return (
    <section className="p-4 border-b border-neutral-300 w-[1000px] mx-auto">
      {!isMoviePage && <h1 className="text-lg font-bold">{movie.title}</h1>}
      <div className="flex justify-between">
        <div className="flex items-center mb-2">
          <Rating
            initialValue={rating / 2}
            readonly
            size={20}
            fillColor="#EE8080"
            SVGstyle={{ display: "inline" }}
            allowFraction={true}
            className="mr-2"
          />
          <span className="mt-1">{rating}</span>
        </div>
        {isOwner && (
          <ReviewActions
            reviewId={_id}
            username={writer.username}
            movieId={movie._id}
          />
        )}
      </div>
      <p className="mb-2">{content}</p>
      <div className="flex justify-end items-center">
        <span className="text-sm text-c1 mr-6">{parseDate(createdAt)}</span>
        {!isOwner && isMoviePage && (
          <span className="text-c3">by. {writer.username}</span>
        )}
      </div>
    </section>
  );
}
