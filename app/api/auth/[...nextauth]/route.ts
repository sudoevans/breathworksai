import { db } from "@/app/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt-ts"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Adapter } from 'next-auth/adapters'
 
const handler =  NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'signin',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: { label: 'Password', type: 'password' }
      },
      authorize: async (credentials, req) => {
        
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid email or password");
          }
        
          // Fetch user from database based on email
          const user = await db.user.findFirst({
            where: {
              email: credentials.email
            }
          });
        
          if (!user || !user.password) {
            throw new Error("Invalid Email or Password");
          }
        
          // Compare passwords
          const isCorrectPassword = await compare(credentials.password as string, user.password);
          if (!isCorrectPassword) {
            throw new Error("Invalid Email or Password");
          }
        
          // Return the full user object or necessary fields
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            say_name: user.say_name,
            language: user.language,
          } as any;
      },
      
    }),
    
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }
      if (trigger === "update" && session) {
        token = {...token, user : session}
        return token;
      };
      return token;
    },
    async session({ session, token,  user }: any) {
        session.user = {...token}
        return session;
    }
  },
})

export { handler as GET, handler as POST }