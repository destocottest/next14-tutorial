import { type DefaultSession } from "next-auth";

declare module "@auth/core/types" {
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin: boolean;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id: string;
    isAdmin: boolean;
  }
}
