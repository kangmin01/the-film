"use client";

import { usePathname } from "next/navigation";
import Button from "./Button";

export default function MovieDiscussions() {
  const pathname = usePathname();

  return (
    <>
      <Button text="Create a discussion" src={`${pathname}/add-discussion`} />
    </>
  );
}
