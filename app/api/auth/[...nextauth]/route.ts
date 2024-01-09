import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/app/utils/connect';

console.log(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    debug: true,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'hello@example.com' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Missing credentials');
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                    throw new Error('User not found');
                }
                const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword as string);

                if (!passwordsMatch) {
                    throw new Error('Passwords do not match');
                }
                return user;
            }
        })
    ],
    callbacks: {
        //@ts-ignore
        async jwt({ token, user }) {
            if (user?.id) {
                token.id = user.id;
            }
            //@ts-ignore
            if (user?.userName) {
                //@ts-ignore
                token.userName = user.userName;
            }
            return token;
        },
        //@ts-ignore
        async session({ session, token }) {
            //@ts-ignore
            session.id = token.id;
            //@ts-ignore
            session.userName = token.userName;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
