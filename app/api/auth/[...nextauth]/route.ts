import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
    ],
    callbacks: {
        //@ts-ignore
        async jwt({ token, user }) {
            if (user?.id) {
                token.id = user.id;
            }
            if (user?.userName) {
                token.userName = user.userName;
            }
            return token;
        },
        //@ts-ignore
        async session({ session, token }) {
            session.id = token.id.toString();
            session.userName = token.userName;
            return session;
        },
    },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
