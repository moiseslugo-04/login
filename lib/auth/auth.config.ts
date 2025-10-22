import { CredentialsSignin, NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import prisma from '@lib/prisma'

class UserNotFound extends CredentialsSignin {
  code = 'USER_NOT_FOUND'
}

class RequiredData extends CredentialsSignin {
  code = 'REQUIRED_DATA'
}
class InvalidCredentials extends CredentialsSignin {
  code = 'INVALID_CREDENTIALS'
}
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new RequiredData()
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user) throw new UserNotFound()
        const passwordMatch = credentials.password === user.password
        if (!passwordMatch) throw new InvalidCredentials()
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        return token
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name
        return session
      }
      return session
    },
  },
}
