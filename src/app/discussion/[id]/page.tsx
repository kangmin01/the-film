"use client";

import NotFound from "@/app/movie/[id]/not-found";
import { Discussion } from "@/types/discussionTypes";
import { parseDateToUs } from "@/util/date";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  if (isLoading) return <p>Loading...</p>;
  if (error || !discussion) {
    return NotFound();
  }

  const isHost = discussion.host === user.id;

  const guestNum = discussion.guest.length + 1;

  const notices = discussion.notice.split("\r\n");

  const handleRemove = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`${baseURL}/api/movie/remove-discussion`, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        router.push(`/discussions`);
      } else {
        console.error("Failed to delete the discussion.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
          {isHost === true ? (
            <div>
              <button className="w-[200px] mt-10 mr-4 bg-c2 hover:bg-c3 rounded-xl text-xl p-2 px-14 text-white font-bold">
                <Link href={`/discussion/${id}/edit-discussion`}>Edit</Link>
              </button>
              <button
                onClick={handleRemove}
                className="w-[200px] mt-10 bg-point text-center hover:bg-red-500 rounded-xl text-xl p-2 px-14 text-white font-bold"
              >
                Remove
              </button>
            </div>
          ) : (
            <button className="block mt-10 bg-c2 hover:bg-c3 rounded-xl text-xl p-2 px-14 text-white font-bold">
              Join a Discussion
            </button>
          )}
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
        <span className="font-semibold text-xl block mt-10 mb-4">
          [ Additional Notice ]
        </span>
        <ul>
          {notices.map((notice, idx) => (
            <li className="px-4 mb-4" key={idx}>
              {notice}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
