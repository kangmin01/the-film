"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import { FormEvent, useState } from "react";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
  csrfToken?: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
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
      {message && <span>{message}</span>}
      <section className="w-2/5 flex flex-col justify-center items-center mt-40 p-20 border border-neutral-300 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold text-c5 mb-8">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Username"
            required
          />
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-c3 hover:bg-c5 py-3 text-white rounded-md text-2xl font-bold mt-2"
          >
            Sign in
          </button>
        </form>
        <hr className="hr-text" data-content="or" />
        <div className="flex flex-col w-full">
          {Object.values(providers)
            .filter((provider) => provider.id !== "credentials")
            .map(({ name, id }) => (
              <div key={name} className="w-full my-2">
                <button
                  onClick={() => signIn(id, { callbackUrl })}
                  className="w-full shadow-md border border-neutral-400 hover:border-neutral-900 rounded-md py-3 text-lg text-center text-neutral-600 font-semibold"
                >
                  Sign in with {name}
                </button>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}
