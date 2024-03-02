import { UserProfile } from "@/types/userTypes";
import Image from "next/image";
import UserActivity from "./UserActivity";

type Props = {
  user: UserProfile;
  isOwner: Boolean;
};

export default function UserProfile({
  user: { username, avatarUrl, email, reviews, host, guest },
  isOwner,
}: Props) {
  return (
    <section className="mb-16">
      <div className="flex flex-col items-center my-16">
        <Image
          className="rounded-full"
          src={avatarUrl}
          alt="user avatar"
          height={200}
          width={200}
        />
        <h1 className="text-2xl font-bold my-2">{username}</h1>
        <span className="text-lg text-c3">{email}</span>
      </div>
      <UserActivity
        reviews={reviews}
        guest={guest}
        host={host}
        isOwner={isOwner}
      />
    </section>
  );
}
