"use client";

import UserProfile from "@/components/UserProfile";
import { UserInfo } from "@/types/userTypes";
import useSWR from "swr";
import NotFound from "./not-found";
import { useSession } from "next-auth/react";
import ClipSpinner from "@/components/ClipSpinner";

type Props = {
  params: { username: string };
};

export default function UserPage({ params: { username } }: Props) {
  const {
    data: user,
    isLoading,
    error
  } = useSWR<UserInfo>(`/api/user/${username}`);

  const { data } = useSession();
  const sessionUser = data?.user;
  const isOwner = user?.username === sessionUser?.username;

  if (!isLoading && (user === null || error)) {
    return NotFound();
  }

  return (
    <section>
      {isLoading && (
        <div className="text-center mt-32">
          <ClipSpinner />
        </div>
      )}
      {user && <UserProfile user={user} isOwner={isOwner} />}
    </section>
  );
}
