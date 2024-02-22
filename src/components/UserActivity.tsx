"use client";

import { useState } from "react";
import UserReviews from "./UserReviews";
import { Review } from "@/types/reviewTypes";
import { Discussion } from "@/types/discussionTypes";
import UserDiscussions from "./UserDiscussions";

type Props = {
  reviews: Review[];
  isOwner: Boolean;
  host: Discussion[];
  guest: Discussion[];
};

const tabStyle =
  "border-2 border-c1 grow p-4 text-center font-semibold text-lg";

export default function UserActivity({ reviews, isOwner, host, guest }: Props) {
  const [tab, setTab] = useState("reviews");

  return (
    <section>
      <ul className="flex justify-around">
        <li className={tabStyle}>
          <button onClick={() => setTab("reviews")}>Reviews</button>
        </li>
        <li className={`${tabStyle} border-l-0`}>
          <button onClick={() => setTab("discussions")}>Discussions</button>
        </li>
      </ul>
      {tab === "reviews" && <UserReviews reviews={reviews} isOwner={isOwner} />}
      {tab === "discussions" && <UserDiscussions guest={guest} host={host} />}
    </section>
  );
}
