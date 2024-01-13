"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
  csrfToken?: string;
};

export default function Signin({ providers, callbackUrl, csrfToken }: Props) {
  const [message, setMessage] = useState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/signin", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    const { username, password } = data;

    if (!response.ok) {
      setMessage(data.message);
    } else {
      await signIn("credentials", {
        username,
        password,
      });
    }
  };
  return (
    <>
      {message && <h1>{message}</h1>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
      {Object.values(providers)
        .filter((provider) => provider.id !== "credentials")
        .map(({ name, id }) => (
          <div key={name}>
            <button onClick={() => signIn(id, { callbackUrl })}>
              Sign in with {name}
            </button>
          </div>
        ))}
    </>
  );
}
