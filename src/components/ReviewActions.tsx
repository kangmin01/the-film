import Link from "next/link";
import EditIcon from "./ui/icons/EditIcon";
import RemoveIcon from "./ui/icons/RemoveIcon";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

type Props = {
  reviewId: string;
  username?: string;
  movieId?: string;
};

export default function ReviewActions({ reviewId, username, movieId }: Props) {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const handleRemove = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`/api/movie/remove-review`, {
        method: "DELETE",
        body: JSON.stringify({ id: reviewId })
      });

      await mutate(`/api/user/${username}`);
      await mutate("/api/reviews");
      await mutate(`/api/movie/${movieId}`);

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete the review.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex text-neutral-300 items-center pr-6">
      <Link
        href={`/review/${reviewId}/edit-review`}
        className="mr-1.5 hover:text-neutral-500"
      >
        <EditIcon />
      </Link>
      <button onClick={handleRemove} className="hover:text-neutral-500">
        <RemoveIcon />
      </button>
    </div>
  );
}
