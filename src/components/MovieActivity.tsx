"use client";

import { useEffect, useState } from "react";
import MovieReviews from "./MovieReviews";
import { Review } from "@/types/reviewTypes";
import MovieDiscussions from "./MovieDiscussions";
import { Discussion } from "@/types/discussionTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  reviews: Review[];
  discussions: Discussion[];
};

const tabStyle =
  "border-2 border-c1 grow p-4 text-center font-semibold text-lg";

export default function MovieActivity({ reviews, discussions }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState("reviews");

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab") || "reviews";
    setTab(tabParam);
  }, [searchParams]);

  const handleTab = (newTab: string) => {
    setTab(newTab);
    router.push(`${pathname}?tab=${newTab}`);
  };

  return (
    <section className="w-full">
      <ul className="flex justify-around">
        <li className={tabStyle}>
          <button onClick={() => handleTab("reviews")}>Reviews</button>
        </li>
        <li className={`${tabStyle} border-l-0`}>
          <button onClick={() => handleTab("discussions")}>Discussions</button>
        </li>
      </ul>
      <div className="py-8 border-2 border-c1 border-t-0 h-[600px] overflow-hidden">
        {tab === "reviews" && <MovieReviews reviews={reviews} />}
        {tab === "discussions" && (
          <MovieDiscussions discussions={discussions} />
        )}
      </div>
    </section>
  );
}
