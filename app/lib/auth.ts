import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "./db"
import authConfig from "./auth.config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(db),
  pages: {
    signIn: '/login'
  },
  session: { strategy: "jwt" },
  ...authConfig
})
