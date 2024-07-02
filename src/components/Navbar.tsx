"use client";

import Link from "next/link";
import { lobsterTwo } from "../app/font";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const menu = [
  {
    href: "/search",
    title: "Movie"
  },
  {
    href: "/reviews",
    title: "Review"
  },
  {
    href: "/discussions",
    title: "Discussion"
  }
];

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="bg-c1 flex justify-between items-center px-6 py-3">
      <Link
        href="/"
        className={`${lobsterTwo.className} text-c5 text-4xl whitespace-nowrap`}
      >
        The Film
      </Link>
      <nav>
        <ul className="flex gap-4 text-xl">
          {menu.map(({ href, title }) => (
            <li key={href} className="flex items-center">
              <Link href={href}>{title}</Link>
            </li>
          ))}
          {user && (
            <div>
              <Link href={`/user/${user.username}`}>
                <Image
                  src={user.image}
                  width={40}
                  height={40}
                  alt={user.name || "user profile"}
                  priority
                  className="rounded-full"
                />
              </Link>
            </div>
          )}
          {session ? (
            <button
              className="whitespace-nowrap"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sing out
            </button>
          ) : (
            <>
              <button className="whitespace-nowrap" onClick={() => signIn()}>
                Sign in
              </button>
              <Link href="/signup" className="whitespace-nowrap">
                Sign Up
              </Link>
            </>
          )}
          {user?.type === "admin" ? (
            <li className="flex items-center whitespace-nowrap">
              <Link href="/admin/add-movie">Add Movie</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </nav>
    </div>
  );
}
