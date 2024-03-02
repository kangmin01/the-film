"use client";

import { uploadImage } from "@/lib/uploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function AddMoviePage() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (file === null) return;
      const url = await uploadImage(file);

      const formData = new FormData(e.target as HTMLFormElement);
      formData.set("posterUrl", url);

      const response = await fetch("/api/admin/add-movie", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    setFile(files && files[0]);
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl font-bold text-c3 mt-20 mb-12">Add Movie</h1>
      <form
        className="flex flex-col gap-6 w-[400px]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input
          className="w-full outline-none border border-c1 rounded-md p-4"
          type="text"
          name="title"
          placeholder="Title"
          required
        />
        {file && (
          <div className="w-full h-[300px] relative">
            <Image
              src={URL.createObjectURL(file)}
              fill
              alt="Poster"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <div className="flex justify-center">
          <label
            htmlFor="posterUrl"
            className="p-1 px-2 border bg-blue-50 hover:bg-blue-100 cursor-pointer border-neutral-200 text-c3 rounded-3xl"
          >
            Select Poster
          </label>
        </div>
        <input
          className="hidden"
          type="file"
          id="posterUrl"
          name="posterUrl"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <input
          className="w-full outline-none border border-c1 rounded-md p-4"
          type="text"
          name="director"
          placeholder="director"
          required
        />
        <input
          className="w-full outline-none border border-c1 rounded-md p-4"
          type="date"
          name="releaseDate"
          required
        />
        <textarea
          className="w-full outline-none border border-c1 rounded-md p-4"
          name="description"
          placeholder="description"
          cols={10}
          rows={5}
          required
        />
        <button className="w-full bg-c2 rounded-xl px-20 py-2.5 text-xl font-bold text-white">
          Add Movie
        </button>
      </form>
    </section>
  );
}
