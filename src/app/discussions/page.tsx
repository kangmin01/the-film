"use client";

import { Discussion } from "@/types/discussionTypes";
import useSWR from "swr";
import NotFound from "../movie/[id]/not-found";
import DiscussionCard from "@/components/DiscussionCard";

export default function DiscussionsPage() {
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
      <h1 className="font-bold text-4xl mt-20 mb-10 text-center">
        Open Discussion Boards
      </h1>
      <ul className="w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {discussions &&
          discussions.map((discussion) => (
            <li key={discussion._id}>
              <DiscussionCard discussion={discussion} />
            </li>
          ))}
      </ul>
    </section>
  );
}
