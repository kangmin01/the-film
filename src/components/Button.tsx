import Link from "next/link";

type Props = {
  text: string;
  src: string;
};

export default function Button({ text, src }: Props) {
  return (
    <div className="relative">
      <Link
        className="absolute right-20 bg-c2 text-white text-lg font-semibold p-2 rounded-lg"
        href={src}
      >
        {text}
      </Link>
    </div>
  );
}
