import Link from "next/link";
import EditIcon from "./ui/icons/EditIcon";
import RemoveIcon from "./ui/icons/RemoveIcon";
import { useRouter } from "next/navigation";
import { useSWRConfig } from "swr";

type Props = {
  discussionId: string;
  username?: string;
  movieId?: string;
};

export default function DiscussionActions({
  discussionId,
  username,
  movieId
}: Props) {
  const router = useRouter();

  const { mutate } = useSWRConfig();

  const handleRemove = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`/api/movie/remove-discussion`, {
        method: "DELETE",
        body: JSON.stringify({ id: discussionId })
      });

      await mutate(`/api/user/${username}`);
      await mutate("/api/discussions");
      await mutate(`/api/movie/${movieId}`);

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to delete the discussion.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="absolute bottom-5 right-1 flex text-neutral-300 items-center pr-6">
      <Link
        href={`/discussion/${discussionId}/edit-discussion`}
        onClick={(e) => e.stopPropagation()}
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
