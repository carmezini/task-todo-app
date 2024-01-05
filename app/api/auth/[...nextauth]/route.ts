import NextAuth from 'next-auth/next';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        CredentialsProvider({
            type: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'john@example.com' },
                password: { label: 'password', type: 'password', placeholder: '**********' },
            },
            authorize(credentials, req) {
                const {email, password} = credentials as { email: string, password: string };

                if (email !== 'john@example.com' && password !== '1234') {
                    return null;
            }
            return {id: '1234', name: 'John Doe', email: '1234'}
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

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
