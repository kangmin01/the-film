"use client";

import useSWR from "swr";
import ReviewCard from "./ReviewCard";
import { Review } from "@/types/reviewTypes";

export default function Reviews() {
  const { data: reviews } = useSWR<Review[]>("/api/reviews");

  return (
    <section>
      <h1 className="font-bold text-4xl mt-20 mb-10 text-center">
        All Reviews
      </h1>
      <ul className="w-[860px] mx-auto">
        {reviews &&
          reviews.map((review) => (
            <li
              key={review._id}
              className="px-4 py-6 border-t border-neutral-300"
            >
              <ReviewCard review={review} />
            </li>
          ))}
      </ul>
    </section>
  );
}
