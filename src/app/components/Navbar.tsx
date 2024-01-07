import Link from "next/link";
import { lobsterTwo } from "../font";
import { IoSearchOutline } from "react-icons/io5";

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
        </ul>
      </nav>
    </div>
  );
}
