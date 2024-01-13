"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const [message, setMessage] = useState();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target as HTMLFormElement);
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

  return (
    <div>
      {message && <h1>{message}</h1>}
      <form onSubmit={handleSubmit}>
        {/* <input type="file" name="avatarUrl" accept="image/*" /> */}
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
