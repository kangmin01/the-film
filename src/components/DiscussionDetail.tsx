import { Discussion } from "@/types/discussionTypes";
import { parseDateToUs } from "@/util/date";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CloseIcon from "./ui/icons/CloseIcon";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSWRConfig } from "swr";

type Props = {
  discussion: Discussion;
  onClose: () => void;
  username?: string;
  movieId?: string;
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function DiscussionDetail({
  discussion,
  onClose,
  username,
  movieId,
}: Props) {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (session) {
      setUser(session.user);
    } else {
      setUser(null);
    }

    if (session && discussion) {
      setIsHost(discussion.host === session.user.id);
      setIsGuest(discussion.guest.includes(session.user.id));
    }
  }, [session, discussion, user]);

  const router = useRouter();

  const guestNum = discussion.guest.length + 1;

  const notices = discussion.notice.split("\r\n");

  const { mutate } = useSWRConfig();

  const handleRemove = async () => {
    try {
      const response = await fetch(`${baseURL}/api/movie/remove-discussion`, {
        method: "DELETE",
        body: JSON.stringify({ id: discussion._id }),
      });

      await mutate(`/api/user/${username}`);
      await mutate("/api/discussions");
      await mutate(`/api/movie/${movieId}`);

      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to delete the discussion.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleJoin = async () => {
    try {
      const response = await fetch(
        `${baseURL}/api/discussion/join-discussion`,
        {
          method: "PUT",
          body: JSON.stringify({ id: discussion._id, user: session?.user.id }),
        }
      );
      await mutate(`/api/movie/${discussion.movie._id}`);
      await mutate("/api/discussions");

      if (response.ok) {
        router.refresh();
        setIsGuest(true);
      } else {
        console.error("Failed to delete the discussion.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section className="flex flex-col relative justify-center items-center px-40 py-24">
      <button
        className="absolute text-lg top-7 right-7 text-neutral-400"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <CloseIcon />
      </button>
      <div className="flex">
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
          <h2 className="text-3xl font-bold mb-6 w-[600px]">
            {discussion.subtitle}
          </h2>
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
              <Link
                className="inline-block text-center w-[200px] mt-10 mr-4 bg-c2 hover:bg-c3 rounded-xl text-xl p-2 px-14 text-white font-bold"
                href={`/discussion/${discussion._id}/edit-discussion`}
              >
                Edit
              </Link>
              <button
                onClick={handleRemove}
                className="w-[200px] mt-10 bg-point text-center hover:bg-red-500 rounded-xl text-xl p-2 px-14 text-white font-bold"
              >
                Remove
              </button>
            </div>
          ) : isGuest === false ? (
            <button
              onClick={handleJoin}
              className="block mt-10 bg-c2 hover:bg-c3 rounded-xl text-xl p-2 px-14 text-white font-bold"
            >
              Join a Discussion
            </button>
          ) : (
            <button
              disabled={true}
              className="block mt-10 bg-c3 rounded-xl text-xl p-2 px-14 text-white font-bold"
            >
              Complete join
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <ul className="text-neutral-400 mt-8">
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
        <span className="font-semibold text-xl block mt-10">
          [ Additional Notice ]
        </span>
        <ul className="w-[800px]">
          {notices.map((notice, idx) => (
            <li className="mt-4" key={idx}>
              {notice}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
