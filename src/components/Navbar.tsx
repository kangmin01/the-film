"use client";

import Link from "next/link";
import { lobsterTwo } from "../app/font";
import { IoSearchOutline } from "react-icons/io5";
import { useSession, signIn, signOut } from "next-auth/react";

const menu = [
  {
    href: "/search",
    title: <IoSearchOutline />,
  },
  {
    href: "/reviews",
    title: "Reviews",
  },
  {
    href: "/discussions",
    title: "Discussions",
  },
];

export default function Navbar() {
  const { data: session, data } = useSession();
  const user = session?.user;

  return (
    <div className="bg-c1 flex justify-between items-center px-6 py-3">
      <Link href="/" className={`${lobsterTwo.className} text-c5 text-4xl`}>
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
              <p>{user.email}</p>
              <img src={user.image} alt={user.name} />
            </div>
          )}
          {session ? (
            <button onClick={() => signOut()}>sing out</button>
          ) : (
            <>
              <button onClick={() => signIn()}>sign in</button>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
