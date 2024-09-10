import { db } from "@/app/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { compare } from "bcrypt-ts"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Adapter } from 'next-auth/adapters'
 
const handler =  NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',  // Error page
  },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Sign in',
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
            email: user.email,
            name: user.name,
            say_name: user.say_name,
            language: user.language,
          } as any;
      },
      
    }),
    
  ],
  callbacks: {
    async jwt({ token, user }) {
        console.log("I am", user, token)
        const isSignIn = user ? true : false;
        // if (isSignIn) {
        //   token.jwt = user.jwt;
        //   token.id = user.user.id;
        //   token.username = user.user.username;
        // }
        return Promise.resolve(token);
    },
    async session({ session, token,  user }: any) {
        console.log("SESSION callback", session, user, token)
        // session.jwt = user.jwt;
        // session.id = user.id;
        // session.username = user.username;
        return Promise.resolve(token);
    }
  }
})

export { handler as GET, handler as POST }