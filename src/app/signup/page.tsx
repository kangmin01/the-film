"use client";

import { uploadImage } from "@/lib/uploadImage";
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
    <div>
      {message && <h1>{message}</h1>}
      {file && <img src={URL.createObjectURL(file)} alt="avatar" />}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="file"
          name="avatarUrl"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {/* <input type="text" name="username" placeholder="Username" required /> */}
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          required
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}
