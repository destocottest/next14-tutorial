import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.username || !credentials.password) return null;

        const credentialsUsername = credentials.username as string;
        const credentialsPassword = credentials.password as string;
        try {
          const user = await login(credentialsUsername, credentialsPassword);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        try {
          if (!profile) return false;
          console.log(profile);
          connectToDb();
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});

async function login(credentialsUsername: string, credentialsPassword: string) {
  try {
    connectToDb();
    const user = await User.findOne({
      username: credentialsUsername,
    });

    if (!user) throw new Error("Wrong credentials!");

    const isPasswordValid = user.password
      ? await bcrypt.compare(credentialsPassword, user.password)
      : false;

    if (!isPasswordValid) throw new Error("Wrong credentials!");

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login!");
  }
}
