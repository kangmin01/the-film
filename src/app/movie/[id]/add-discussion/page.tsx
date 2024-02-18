"use client";

import { SearchMovie } from "@/types/movieTypes";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import NotFound from "../not-found";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function AddDiscussionPage({ params: { id } }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const router = useRouter();

  const { data: movie, isLoading } = useSWR<SearchMovie>(`/api/movie/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (!movie) {
    return NotFound();
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
      formData.set("movie", movie._id.toString());
      formData.set("host", user.id);

      const response = await fetch("/api/movie/add-discussion", {
        method: "POST",

        body: formData,
      });

      if (response.ok) {
        router.push(`/movie/${id}`);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <div className="mt-12 mb-8 text-center">
        <h1 className="text-3xl font-bold text-c3">Schedule a discussion</h1>
        <h2 className="text-2xl font-semibold mt-6">Movie Title</h2>
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
            required
          />
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="date"
            name="date"
            required
          />
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="time"
            name="startTime"
            required
          />
          <textarea
            className="outline-none border border-c1 rounded-md p-4"
            name="notice"
            cols={10}
            rows={5}
            placeholder="Write about any additional caveats"
          ></textarea>
          <div className="flex items-center justify-between w-full">
            <input
              className="outline-none border border-c1 rounded-md p-2 min-w-0"
              type="number"
              name="minHeadcount"
              placeholder="minHeadcount"
              required
            />
            <span className="w-[50px] text-center"> ~ </span>
            <input
              className="outline-none border border-c1 rounded-md p-2 min-w-0"
              type="number"
              name="maxHeadcount"
              placeholder="maxHeadcount"
              required
            />
          </div>
          <input
            className="outline-none border border-c1 rounded-md p-4"
            type="url"
            name="meetingUrl"
            placeholder="upload a meeting url"
          />
          <button className="bg-c2 rounded-xl px-20 py-2.5 text-xl font-bold text-white">
            Create
          </button>
        </form>
      </div>
    </section>
  );
}
