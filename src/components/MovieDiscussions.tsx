"use client";

import { usePathname } from "next/navigation";
import Button from "./Button";
import { Discussion } from "@/types/discussionTypes";
import SimpleDiscussionCard from "./SimpleDiscussionCard";

type Props = {
  discussions: Discussion[];
};

export default function MovieDiscussions({ discussions }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Button text="Create a discussion" src={`${pathname}/add-discussion`} />
      <ul>
        {discussions &&
          discussions.map((discussion) => (
            <li key={discussion._id} className="mb-2">
              <SimpleDiscussionCard discussion={discussion} />
            </li>
          ))}
      </ul>
    </>
  );
}
