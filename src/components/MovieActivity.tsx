"use client";

import { useState } from "react";
import MovieReviews from "./MovieReviews";
import { Review } from "@/types/reviewTypes";

type Props = {
  reviews: Review[];
};

const tabStyle =
  "border-2 border-c1 grow p-4 text-center font-semibold text-lg";

export default function MovieActivity({ reviews }: Props) {
  const [tab, setTab] = useState("reviews");
  return (
    <section className="w-full">
      <ul className="flex justify-around">
        <li className={tabStyle}>
          <button onClick={() => setTab("reviews")}>Reviews</button>
        </li>
        <li className={`${tabStyle} border-l-0`}>
          <button onClick={() => setTab("discussions")}>Discussions</button>
        </li>
      </ul>
      <div className="py-8 border-2 border-c1 border-t-0 h-[600px] overflow-hidden">
        {tab === "reviews" && <MovieReviews reviews={reviews} />}
        {tab === "discussions" && <div>토론입니당</div>}
      </div>
    </section>
  );
}
