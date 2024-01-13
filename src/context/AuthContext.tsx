"use client";

import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

// 로그인한 사용자의 상태를 가지고 있는 우산이다.
export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
