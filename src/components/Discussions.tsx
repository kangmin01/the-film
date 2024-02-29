"use client";

import { Discussion } from "@/types/discussionTypes";
import useSWR from "swr";
import DiscussionCard from "@/components/DiscussionCard";
import NotFound from "@/app/movie/[id]/not-found";

export default function Discussions() {
  const {
    data: discussions,
    isLoading,
    error,
  } = useSWR<Discussion[]>("/api/discussions");

  if (isLoading) return <p>Loading...</p>;
  if (!discussions && error) {
    return NotFound();
  }

  return (
    <section>
      <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {discussions &&
          discussions.map(
            (discussion) =>
              discussion.status === "Recruiting" && (
                <li key={discussion._id}>
                  <DiscussionCard discussion={discussion} />
                </li>
              )
          )}
      </ul>
    </section>
  );
}
