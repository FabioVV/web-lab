import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({

  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),

    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
    
            const res = await fetch("http://127.0.0.1:8000/api/token/", {
              method:"POST",
              headers: {
                  "Content-Type":"application/json",
              }, 

              body: JSON.stringify({
                  email: credentials?.email,
                  password: credentials?.password,
              })
              
            });
           const user_token = await res.json()
           console.log(user_token)

           if(res.status != 200){

              return null

           } else {

            const user_get = await fetch("http://127.0.0.1:8000/api/v3/usuarios/", {

              method:"GET",
              headers: {
                "Content-Type":"application/json",
                  Authorization:`Bearer ${user_token['access']}`,
              }
              
            });

            const user_result = await user_get.json()
            let user = user_result['results'][0]
            Object.assign(user, {access:user_token['access']})

            if (user) {
              
              return user

            } else {
              return null
            }
           }

          
        }
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  callbacks:{
    async jwt({session, token, user, trigger}){
      if(trigger === "update"){
        return {...token, ...session}
      }
      return {...token, ...user}
    },
    async session({session, token, user}){
      session.user = token
      return session
    },
  }
})