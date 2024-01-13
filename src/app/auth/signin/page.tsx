import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/components/Signin";
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
  const csrfToken = (await getCsrfToken()) || "";

  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) ?? {};

  return (
    <Signin
      providers={providers}
      callbackUrl={callbackUrl ?? "/"}
      csrfToken={csrfToken}
    />
  );
}
