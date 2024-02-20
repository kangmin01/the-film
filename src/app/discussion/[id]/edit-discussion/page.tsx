"use client";

import NotFound from "@/app/movie/[id]/not-found";
import { Discussion, DiscussionState } from "@/types/discussionTypes";
import { parseDate } from "@/util/date";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

type Props = {
  params: { id: string };
};

export default function EditDiscussionPage({ params: { id } }: Props) {
  const { data: discussion, isLoading } = useSWR<Discussion>(
    `/api/discussion/${id}/edit-discussion`
  );
  const router = useRouter();
  const [updatedData, setUpdatedData] = useState<DiscussionState>({});

  useEffect(() => {
    if (discussion) {
      setUpdatedData(discussion);
    }
  }, [discussion]);

  if (isLoading) return <p>Loading...</p>;
  if (!discussion) {
    return NotFound();
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);

      const response = await fetch(`/api/discussion/${id}/edit-discussion`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/discussions");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div className="mt-12 mb-8 text-center">
        <h1 className="text-3xl font-bold text-c3">Schedule a discussion</h1>
        <h2 className="text-2xl font-semibold mt-6">
          {discussion.movie.title}
        </h2>
      </div>
      <div className="flex flex-col items-center">
        <ul className="text-neutral-400 mb-8">
          <li>
            {`• Please provide a brief description of how you'd like to run the
        discussion.`}
          </li>
          <li>• Please provide an approximate time for the discussion.</li>
          <li>• Create a meeting address on Google Meet.</li>
        </ul>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-[400px]">
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="text"
            name="subtitle"
            placeholder="Subtitle"
            value={updatedData.subtitle || ""}
            onChange={handleChange}
            required
          />
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="date"
            name="date"
            value={updatedData.date ? parseDate(updatedData.date) : ""}
            onChange={handleChange}
            required
          />
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="time"
            name="startTime"
            value={updatedData.startTime || ""}
            onChange={handleChange}
            required
          />
          <textarea
            className="outline-none border border-c1 rounded-md p-4"
            name="notice"
            cols={10}
            rows={5}
            value={updatedData.notice || ""}
            onChange={handleChange}
            placeholder="Write about any additional caveats"
          ></textarea>
          <div className="flex items-center justify-between w-full">
            <input
              className="outline-none border border-c1 rounded-md p-2 min-w-0"
              type="number"
              name="minHeadcount"
              placeholder="minHeadcount"
              value={updatedData.minHeadcount || 2}
              onChange={handleChange}
              required
            />
            <span className="w-[50px] text-center"> ~ </span>
            <input
              className="outline-none border border-c1 rounded-md p-2 min-w-0"
              type="number"
              name="maxHeadcount"
              placeholder="maxHeadcount"
              value={updatedData.maxHeadcount || 10}
              onChange={handleChange}
              required
            />
          </div>
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="url"
            name="meetingUrl"
            placeholder="upload a meeting url"
            value={updatedData.meetingUrl || ""}
            onChange={handleChange}
            required
          />
          <button className="bg-c2 rounded-xl px-20 py-2.5 text-xl font-bold text-white">
            Update Discussion
          </button>
        </form>
      </div>
    </section>
  );
}
