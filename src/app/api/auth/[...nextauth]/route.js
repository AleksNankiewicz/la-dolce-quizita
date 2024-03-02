import { User } from '@/lib/models'
import { connectToDb } from '@/lib/utils'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { getUserByEmail } from '@/lib/actions'

const handler = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'jsmith' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        //   console.log({ credentials })
        const { email, password } = credentials

        console.log(credentials)

        try {
          const user = await getUserByEmail(email)

          if (!user) {
            // User not found
            return { error: 'my custom error' }
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          )

          if (isPasswordCorrect) {
            // Passwords match, return the user object
            return user
          } else {
            // Passwords don't match, return null
            return null
          }
        } catch (error) {
          // Handle any errors that occur during the authorization process
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    // async redirect(url, baseUrl) {
    //   return url.startsWith(baseUrl) ? url : baseUrl
    // },
    async signIn({ user, account, profile, email, credentials }) {
      if (user?.error === 'my custom error') {
        throw new Error('custom error to the client')
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.isAdmin = user.isAdmin
        token.email = user.email
        token.points = user.points
        token.gamePlayed = user.gamePlayed
        token.gameWon = user.gameWon
        token.img = user.img
        token.slug = user.slug
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.isAdmin = token.isAdmin
        session.user.email = token.email
        session.user.points = token.points
        session.user.gamePlayed = token.gamePlayed
        session.user.gameWon = token.gameWon
        session.user.img = token.img
        session.user.slug = token.slug
      }
      return session
    },
    authorized({ auth, request }) {
      console.log(auth)
      return true
    },
  },
})

export { handler as GET, handler as POST }
