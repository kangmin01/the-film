import { Discussion } from "@/types/discussionTypes";
import SimpleDiscussionCard from "./SimpleDiscussionCard";
import { Span } from "next/dist/trace";

type Props = {
  host: Discussion[];
  guest: Discussion[];
};

export default function UserDiscussions({ host, guest }: Props) {
  return (
    <section className="flex justify-around py-12 border-2 border-c1 border-t-0 h-[600px]">
      <div className="w-[500px]">
        <span className="text-c3 text-xl font-semibold flex justify-center mb-6">
          {`< Host >`}
        </span>
        <ul className="h-[90%] p-4 overflow-y-auto">
          {host &&
            host.map((data) => (
              <li key={data._id} className="mb-4">
                <SimpleDiscussionCard discussion={data} />
              </li>
            ))}
          {host.length === 0 && (
            <span className="flex justify-center text-2xl text-neutral-400">{`No discussions you've hosted.`}</span>
          )}
        </ul>
      </div>
      <div className="w-[500px]">
        <span className="text-c3 text-xl font-semibold flex justify-center mb-6">
          {`< Guest >`}
        </span>
        <ul className="h-[90%] p-4 overflow-y-auto">
          {guest &&
            guest.map((data) => (
              <li key={data._id} className="mb-2">
                <SimpleDiscussionCard discussion={data} />
              </li>
            ))}
          {guest.length === 0 && (
            <span className="flex justify-center text-2xl text-neutral-400">{`No discussions you've joined.`}</span>
          )}
        </ul>
      </div>
    </section>
  );
}
