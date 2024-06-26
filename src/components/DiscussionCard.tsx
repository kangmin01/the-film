"use client";

import { Discussion } from "@/types/discussionTypes";
import { getDateDifference, parseDateToUs } from "@/util/date";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import DiscussionModal from "./DiscussionModal";
import DiscussionDetail from "./DiscussionDetail";
import { useSession } from "next-auth/react";

type Props = {
  discussion: Discussion;
};

export default function DiscussionCard({ discussion }: Props) {
  const { _id, subtitle, movie, date, startTime, maxHeadcount, guest, host } =
    discussion;
  const { data: session } = useSession();
  const user = session?.user;

  const guestNum = guest.length + 1;

  const today = new Date();
  let dDay = getDateDifference(today.toString(), date);

  const [openModal, setOpenModal] = useState(false);

  return (
    <section
      className="relative block flex-1 border border-c1 p-10 text-center m-6 rounded-3xl hover:shadow-md hover:cursor-pointer"
      onClick={() => setOpenModal(true)}
    >
      {dDay === 0 ? (
        <span className="absolute top-5 left-[-30px] bg-point p-2 px-4 text-white text-xl font-bold rounded-3xl">
          D-Day
        </span>
      ) : dDay <= 3 ? (
        <span className="absolute top-5 left-[-30px] bg-point p-2 px-6 text-white text-xl font-bold rounded-3xl">{`D-${dDay}`}</span>
      ) : null}
      <span className="block font-bold text-2xl mb-4 w-full truncate">
        {movie.title}
      </span>
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
      {openModal ? (
        <ModalPortal>
          <DiscussionModal onClose={() => setOpenModal(false)}>
            <DiscussionDetail
              discussion={discussion}
              onClose={() => setOpenModal(false)}
              username={user?.username}
              movieId={movie._id}
            />
          </DiscussionModal>
        </ModalPortal>
      ) : null}
    </section>
  );
}
