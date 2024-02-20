"use client";

import NotFound from "@/app/movie/[id]/not-found";
import { Discussion } from "@/types/discussionTypes";
import { parseDateToUs } from "@/util/date";
import { link } from "fs";
import Image from "next/image";
import useSWR from "swr";

type Props = {
  params: { id: string };
};

export default function DiscussionPage({ params: { id } }: Props) {
  const {
    data: discussion,
    isLoading,
    error,
  } = useSWR<Discussion>(`/api/discussion/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (error || !discussion) {
    return NotFound();
  }

  const guestNum = discussion.guest.length + 1;

  const notices = discussion.notice.split("\r\n");

  return (
    <section>
      <div className="flex w-4/5 mx-auto mt-20">
        <Image
          className="mr-12"
          src={discussion.movie.posterUrl}
          width={200}
          height={240}
          alt={"poster url"}
        />
        <div className="py-2">
          <h1 className="text-2xl font-semibold mb-6">
            {discussion.movie.title}
          </h1>
          <h2 className="text-3xl font-bold mb-6">{discussion.subtitle}</h2>
          <span className="mr-4 text-xl font-semibold">
            {parseDateToUs(discussion.date)}
          </span>
          <span className="text-xl font-semibold">{discussion.startTime}</span>
          <div className="mt-6">
            <span className="text-xl font-semibold mr-2">
              ( {guestNum} / {discussion.maxHeadcount} )
            </span>
            <span className="text-md text-neutral-500">
              Minimum : {discussion.minHeadcount}
            </span>
          </div>
          <button className="block mt-10 bg-c2 hover:bg-c3 rounded-xl text-xl p-2 px-14 text-white font-bold">
            Join a Discussion
          </button>
        </div>
      </div>
      <div className="pl-28">
        <ul className="text-neutral-400 mt-12">
          <li>
            • If the discussion does not meet the minimum number of
            participants, the discussion will not proceed.
          </li>
          <li>• Discussions are 1 hours long by default.</li>
          <li>
            • An entry link will be emailed to you 20 minutes before the
            discussion starts.
          </li>
        </ul>
        <span className="font-semibold text-xl block mt-6 mb-2">
          [ Additional Notice ]
        </span>
        <ul>
          {notices.map((notice, idx) => (
            <li className="pl-2 mb-1.5" key={idx}>
              {idx + 1}. {notice}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
