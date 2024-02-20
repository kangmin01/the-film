import { Discussion } from "@/types/discussionTypes";
import { parseDateToUs } from "@/util/date";
import { useSession } from "next-auth/react";
import Link from "next/link";
import DiscussionActions from "./DiscussionActions";

type Props = {
  discussion: Discussion;
};

export default function SimpleDiscussionCard({
  discussion: { _id, subtitle, guest, host, maxHeadcount, date, startTime },
}: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const isHost = user.id === host;

  const guestNum = guest.length + 1;

  return (
    <section className="relative ">
      <Link
        href={`/discussion/${_id}`}
        className="block border border-c1 hover:border-c2 p-4 px-6 rounded-2xl"
      >
        <h1 className="text-xl font-bold text-c5 mb-2">{subtitle}</h1>
        <div>
          <span>
            {parseDateToUs(date)} {startTime} {`\n`}
          </span>
          <span className="text-c2">
            ( {guestNum} / {maxHeadcount} )
          </span>
        </div>
      </Link>
      {isHost && <DiscussionActions discussionId={_id} />}
    </section>
  );
}
