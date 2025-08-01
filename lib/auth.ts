import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from './prisma'
import { UserRepository } from '@/repositories/user'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 2 * 60 * 60 },
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@gmail.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Lack Email or Password')
        } else {
          console.log(credentials)
        }
        const user = await UserRepository.getUserByEmail(credentials.email)
        if (!user) {
          throw new Error('User not found')
        }

        const isPasswordCorrect = await compare(credentials.password, user.password)
        if (!isPasswordCorrect) {
          throw new Error('Wrong Password')
        }
        return {
          id: `${user.id}`,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          roleName: user.roleName,
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          image: user.image,
          roleName: user.roleName,
        }
      }
      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          roleName: token.roleName,
          phone: token.phone,
        },
        infor: { token },
      }
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  },
}
