import Link from "next/link";
import EditIcon from "./ui/icons/EditIcon";
import RemoveIcon from "./ui/icons/RemoveIcon";
import { useRouter } from "next/navigation";

type Props = {
  discussionId: string;
};

export default function DiscussionActions({ discussionId }: Props) {
  const router = useRouter();

  const handleRemove = async () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      const response = await fetch(`${baseURL}/api/movie/remove-discussion`, {
        method: "DELETE",
        body: JSON.stringify({ id: discussionId }),
      });

      if (response.ok) {
        // 리뷰 mutate
        router.push("/discussions");
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
