import { Review } from "@/types/reviewTypes";
import SimpleReviewCard from "./SimpleReviewCard";

type Props = {
  reviews: Review[];
  isOwner: Boolean;
};

export default function UserReviews({ reviews, isOwner }: Props) {
  return (
    <section className="py-12 border-2 border-c1 border-t-0 h-[600px]">
      <ul className="h-full overflow-y-auto">
        {reviews &&
          reviews.map((review) => (
            <li key={review._id} className="mb-2">
              <SimpleReviewCard review={review} isOwner={isOwner} />
            </li>
          ))}
      </ul>
    </section>
  );
}
