import Signin from "@/components/Signin";
import { authOptions } from "@/authOptions";
import { getServerSession } from "next-auth";
import { getCsrfToken, getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  searchParams: { callbackUrl: string };
};

export default async function SignInpage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) ?? {};
  return (
    <div className="w-full flex justify-center">
      <Signin providers={providers} callbackUrl={callbackUrl ?? "/"} />
    </div>
  );
}
