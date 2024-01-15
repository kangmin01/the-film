"use client";

import { uploadImage } from "@/lib/uploadImage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUpPage() {
  const [message, setMessage] = useState();
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (file === null) return;
      const url = await uploadImage(file);

      const formData = new FormData(e.target as HTMLFormElement);
      formData.set("avatarUrl", url);

      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
      } else {
        router.push("/auth/signin");
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
    <section className="w-full flex justify-center">
      {message && <h1>{message}</h1>}
      <div className="w-2/5 flex flex-col justify-center items-center mt-40 p-20 border border-neutral-300 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-c5 mb-8">Sign Up</h1>
        {file && (
          <div className="w-28 h-28">
            <Image
              src={URL.createObjectURL(file)}
              width={100}
              height={100}
              alt="Avatar Image"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="flex flex-col w-full items-center"
        >
          <label
            htmlFor="avatarUrl"
            className="w-1/2 p-1 my-6 text-center rounded-md border border-neutral-400 hover:border-neutral-700 text-neutral-700 cursor-pointer "
          >
            Select Profile Image
          </label>
          <input
            className="hidden"
            type="file"
            id="avatarUrl"
            name="avatarUrl"
            accept="image/*"
            onChange={handleChange}
            required
          />
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Confirm Password"
            required
          />
          <button className="w-full bg-c3 hover:bg-c5 py-3 text-white rounded-md text-2xl font-bold mt-6">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}
