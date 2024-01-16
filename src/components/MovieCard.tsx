import { SearchMovie } from "@/types/movieTypes";
import { parseDate } from "@/util/date";
import Image from "next/image";
import Link from "next/link";

type Props = {
  movie: SearchMovie;
};

export default function MovieCard({
  movie: { _id, title, posterUrl, director, releaseDate, rating, description },
  movie,
}: Props) {
  console.log(rating);
  return (
    <Link href={`/movie/${_id}`} className="flex">
      <Image
        className="mr-4"
        src={posterUrl}
        width={160}
        height={260}
        alt={title}
      />
      <div className="flex flex-col w-3/4">
        <span className="w-full font-bold text-3xl truncate mb-2">
          {title}{" "}
          <span className="text-neutral-400 text-sm font-light">
            {parseDate(releaseDate)}
          </span>
        </span>
        <span className="font-semibold text-neutral-700 mb-2">{director}</span>
        <span>{rating}</span>
        <p className="line-clamp-5 mt-4 text-neutral-800">{description}</p>
      </div>
    </Link>
  );
}
