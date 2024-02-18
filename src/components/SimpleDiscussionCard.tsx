import { Discussion } from "@/types/discussionTypes";

type Props = {
  discussion: Discussion;
};

export default function SimpleDiscussionCard({
  discussion: { subtitle },
}: Props) {
  return <h1>{subtitle}</h1>;
}
