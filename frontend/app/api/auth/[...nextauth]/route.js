import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import axiosClient from '../../axios-client';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        try {
          const response = await axiosClient.post('/login', {
              username: credentials.username,
              password: credentials.password
          });

          const user = response.data.user;
          const token = response.data.token;

          if (!user || !token) {
            throw new Error('Invalid credentials');
          }

          return {...user, token};
        }
        catch (error) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.accessToken = user.token;
        token.username = user.username;
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken;
      session.user.username = token.username;
      return session;
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
