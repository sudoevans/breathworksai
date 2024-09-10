import Credentials from "next-auth/providers/credentials"


export default {
    providers: [
        Credentials({
          name: 'Sign in',
          credentials: {
            // email: {
            //   label: 'Email',
            //   type: 'email',
            //   placeholder: 'hello@example.com'
            // },
            // password: { label: 'Password', type: 'password' }
          },
          authorize: async (credentials) => {  
            console.log("I rendered")
            // const user = await db.user.findFirst({
            //   where: {
            //     email: email
            //   }
            // })

            // if(user){
            //   const {email: userEmail, password: userPwd, language, say_name, name} = user
            //   // logic to salt and hash password
            // const pwdMatch = await compare(password as string, userPwd)
            // if(pwdMatch){
            //   return  {
            //     email: userEmail,
            //     name,
            //     language,
            //     say_name
            //   }
            // }
            // }
     
            // return user object with their profile data
            return null
          },
        }),
      ],
      // callbacks: {
      //   authorized({ auth, request: { nextUrl } }) {
      //     console.log(auth)
      //     const isLoggedIn = !!auth?.user;
      //     const isOnDashboard = nextUrl.pathname.startsWith('/protected');
      //     const isOnPublicPage = ['/generate-audio', '/about', '/contact'].includes(nextUrl.pathname);
    
      //     if (isOnDashboard) {
      //       if (isLoggedIn) return true;
      //       return false; // Redirect unauthenticated users to login page
      //     } else if (isOnPublicPage) {
      //       return true; // Allow access to public pages regardless of auth status
      //     } else if (isLoggedIn) {
      //       return Response.redirect(new URL('/protected', nextUrl));
      //     }
    
      //     return true;
      //   },
      // },
}