import { Review } from "@/types/reviewTypes";
import SimpleReviewCard from "./SimpleReviewCard";
import Button from "./Button";
import { usePathname } from "next/navigation";

type Props = {
  reviews: Review[];
};

export default function MovieReviews({ reviews }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Button text="Write a review" src={`${pathname}/add-review`} />
      <ul className="h-4/5 overflow-y-auto">
        {reviews &&
          reviews.map((review) => (
            <li key={review._id} className="mb-2">
              <SimpleReviewCard review={review} />
            </li>
          ))}
      </ul>
    </>
  );
}
