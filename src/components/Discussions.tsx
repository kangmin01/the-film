"use client";

import { Discussion } from "@/types/discussionTypes";
import useSWR from "swr";
import DiscussionCard from "@/components/DiscussionCard";
import NotFound from "@/app/movie/[id]/not-found";
import ClipSpinner from "./ClipSpinner";

export default function Discussions() {
  const {
    data: discussions,
    isLoading,
    error,
  } = useSWR<Discussion[]>("/api/discussions");

  if (error) {
    return NotFound();
  }

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <ClipSpinner />
        </div>
      )}
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
