import NextAuth from "next-auth"

const handler = NextAuth({
    // configure your preferred providers here
    providers: []
})
export { handler as GET, handler as POST };
