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
        console.log(response.ok);
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
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" required />
        {file && (
          <div className="w-24 h-32">
            <Image
              src={URL.createObjectURL(file)}
              width={100}
              height={140}
              alt="Poster"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <label htmlFor="posterUrl">Select Poster</label>
        <input
          className="hidden"
          type="file"
          id="posterUrl"
          name="posterUrl"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <input type="text" name="director" placeholder="director" required />
        <input type="date" name="releaseDate" required />
        <textarea name="description" placeholder="description" required />
        <button>Add Movie</button>
      </form>
    </>
  );
}
