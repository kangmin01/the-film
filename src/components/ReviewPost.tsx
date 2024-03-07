import { Review } from "@/types/reviewTypes";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";

type Props = {
  review: Review;
};

export default function ReviewPost({
  review: { content, movie, rating },
}: Props) {
  return (
    <section className="flex w-[1100px] pl-20 justify-center">
      <div className="relative w-1/4 h-[200px]">
        <Image
          className="w-full h-full object-contain"
          src={movie.posterUrl}
          alt={movie.title}
          sizes="25vw"
          fill
        />
      </div>
      <div className="w-3/4">
        <span className="block text-xl font-bold mt-2">{movie.title}</span>
        <div className="flex mt-2 w-full items-center justify-center">
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
        <p className="w-full h-[105px] my-2 mt-4">{content}</p>
      </div>
    </section>
  );
}
