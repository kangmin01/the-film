import { Discussion } from "@/types/discussionTypes";
import { parseDateToUs } from "@/util/date";
import { useSession } from "next-auth/react";
import DiscussionActions from "./DiscussionActions";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import DiscussionModal from "./DiscussionModal";
import DiscussionDetail from "./DiscussionDetail";

type Props = {
  discussion: Discussion;
};

export default function SimpleDiscussionCard({ discussion }: Props) {
  const { _id, subtitle, guest, host, maxHeadcount, date, startTime } =
    discussion;
  const { data: session } = useSession();
  const user = session?.user;

  const [openModal, setOpenModal] = useState(false);

  const isHost = user.id === host;

  const guestNum = guest.length + 1;

  return (
    <section className="relative" onClick={() => setOpenModal(true)}>
      <div className="block border border-c1 hover:border-c2 p-4 px-6 rounded-2xl">
        <h1 className="text-xl font-bold text-c5 mb-2">{subtitle}</h1>
        <div>
          <span>
            {parseDateToUs(date)} {startTime} {`\n`}
          </span>
          <span className="text-c2">
            ( {guestNum} / {maxHeadcount} )
          </span>
        </div>
      </div>
      {isHost && <DiscussionActions discussionId={_id} />}
      {openModal ? (
        <ModalPortal>
          <DiscussionModal onClose={() => setOpenModal(false)}>
            <DiscussionDetail
              discussion={discussion}
              onClose={() => setOpenModal(false)}
            />
          </DiscussionModal>
        </ModalPortal>
      ) : null}
    </section>
  );
}
