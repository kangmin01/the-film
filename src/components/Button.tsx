import Link from "next/link";

type Props = {
  text: string;
  src: string;
};

export default function Button({ text, src }: Props) {
  return (
    <div className="flex justify-center mb-8">
      <Link
        className="bg-c2 text-white text-xl font-semibold p-2 px-8 rounded-xl hover:bg-c3"
        href={src}
      >
        {text}
      </Link>
    </div>
  );
}
