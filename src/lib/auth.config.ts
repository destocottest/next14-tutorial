import { NextAuthConfig } from "next-auth";
import { Session } from "next-auth/types";
import { NextRequest } from "next/server";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      const pathname = request.nextUrl.pathname;

      const user = auth?.user;
      const isOnAdminPanel = pathname.startsWith("/admin");
      const isOnBlogPage = pathname.startsWith("/blog");
      const isOnLoginPage = pathname.startsWith("/login");

      if (isOnAdminPanel && !user?.isAdmin) return false;
      if (isOnBlogPage && !user) return false;
      if (isOnLoginPage && user)
        return Response.redirect(new URL("/", request.nextUrl));

      return true;
    },
  },
};
