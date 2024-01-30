import { Review } from "@/types/reviewTypes";
import { parseDate } from "@/util/date";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

type Props = {
  review: Review;
};

export default function ReviewCard({
  review: { content, createdAt, movie, rating, writer },
}: Props) {
  return (
    <section className="flex">
      <Image
        className="mr-4"
        src={movie.posterUrl}
        alt={movie.title}
        width={140}
        height={180}
      />
      <div>
        <h1 className="text-xl font-bold">{movie.title}</h1>
        <div className="flex items-center">
          <Rating
            className="mr-1"
            initialValue={rating / 2}
            readonly
            size={20}
            fillColor="#EE8080"
            SVGstyle={{ display: "inline" }}
            allowFraction={true}
          />
          <span className="mt-1.5">{rating}</span>
        </div>
        <p className="w-[700px] h-[100px] my-2">{content}</p>
        <div className="flex justify-end items-center pr-10">
          <span className="text-sm text-c1 mr-4 mt-0.5">
            {parseDate(createdAt)}
          </span>
          <span className="text-c3">by. {writer.username}</span>
        </div>
      </div>
    </section>
  );
}
