'use client';

import { SessionProvider } from "next-auth/react"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}