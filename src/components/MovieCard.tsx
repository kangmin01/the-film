import { SearchMovie } from "@/types/movieTypes";
import { parseDate } from "@/util/date";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";

type Props = {
  movie: SearchMovie;
};

export default function MovieCard({
  movie: { _id, title, posterUrl, director, releaseDate, rating, description },
}: Props) {
  let ratingAVG = 0;
  if (rating.length > 0) {
    const sum = rating.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    ratingAVG = Math.round((sum / rating.length) * 100) / 100;
  }

  return (
    <Link href={`/movie/${_id}`} className="flex">
      <Image
        className="mr-4"
        src={posterUrl}
        width={160}
        height={260}
        alt={title || "Movie poster"}
      />
      <div className="flex flex-col w-3/4">
        <span className="w-full font-bold text-3xl truncate mb-2">
          {title}
          <span className="text-neutral-400 text-sm font-light ml-2">
            {parseDate(releaseDate)}
          </span>
        </span>
        <span className="font-semibold text-neutral-700 mb-2">{director}</span>
        <div>
          {ratingAVG === 0 ? (
            <span className="italic text-neutral-300">Not yet evaluated</span>
          ) : (
            <div className="flex items-center">
              <Rating
                className="mr-1"
                initialValue={ratingAVG / 2}
                readonly
                size={20}
                fillColor="#EE8080"
                SVGstyle={{ display: "inline" }}
                allowFraction={true}
              />
              <span className="mt-1">{ratingAVG}</span>
            </div>
          )}
        </div>
        <p className="line-clamp-5 mt-4 text-neutral-800">{description}</p>
      </div>
    </Link>
  );
}
