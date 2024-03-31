import Discussions from "@/components/Discussions";

export const dynamic = "force-dynamic";

export default function DiscussionsPage() {
  return (
    <>
      <h1 className="font-bold text-4xl mt-20 mb-10 text-center">
        Open Discussion Boards
      </h1>
      <Discussions />
    </>
  );
}
