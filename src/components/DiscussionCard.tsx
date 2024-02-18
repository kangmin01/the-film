import { Discussion } from "@/types/discussionTypes";
import { getDateDifference, parseDateToUs } from "@/util/date";
import Link from "next/link";

type Props = {
  discussion: Discussion;
};

export default function DiscussionCard({
  discussion: { _id, subtitle, movie, date, startTime, maxHeadcount, guest },
}: Props) {
  const guestNum = guest.length;

  const today = new Date();
  const dDay = getDateDifference(today.toString(), date);

  return (
    <Link
      href={`/discussion/${_id}`}
      className="relative block flex-1 border border-c1 p-10 text-center m-6 rounded-3xl hover:shadow-md"
    >
      {dDay <= 3 && (
        <span className="absolute top-5 left-[-30px] bg-point p-2 px-6 text-white text-xl font-bold rounded-3xl">{`D-${dDay}`}</span>
      )}
      <h1 className="font-bold text-2xl mb-4 w-full">{movie.title}</h1>
      <p className="text-xl font-semibold text-c3 mb-4 w-full truncate">
        {subtitle}
      </p>
      <div className="font-semibold text-xl mb-4">
        <span className="mr-2">{parseDateToUs(date)}</span>
        <span>{startTime}</span>
      </div>
      <span className="text-c2 text-xl">
        ( {guestNum} / {maxHeadcount} )
      </span>
    </Link>
  );
}
