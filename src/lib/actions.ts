"use server";

import { HydratedDocument } from "mongoose";
import { IPost, IUser, Post, User } from "./models";
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export const createPost = async (
  userId: string,
  currentState: { error: string } | undefined,
  formData: FormData
) => {
  const { title, desc } = Object.fromEntries(formData);
  const slug = createSlug(title as string);
  // TODO: check if the slug is taken
  // TODO: allow user to add an image

  try {
    connectToDb();
    const newPost: HydratedDocument<IPost> = new Post({
      title,
      desc,
      slug,
      userId,
    });
    await newPost.save();
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const deletePost = async (id: string) => {
  console.log("UNDER CONSTRUCTION");
  return;
  try {
    connectToDb();
    await Post.findByIdAndDelete(id);
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

function createSlug(title: string) {
  let slug = title.toLowerCase();

  // replaces all non-alphanumeric characters with space
  slug = slug.replace(/[^a-z0-9-]/g, " ");

  // replaces all whitespace with a single dash
  slug = slug.replace(/\s+/g, "-");

  // removes any leading or trailing dashes
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

export const createUser = async (
  currentState: { error: string } | undefined,
  formData: FormData
) => {
  const { username, email, password, img, isAdmin } =
    Object.fromEntries(formData);

  // TODO: check if username is taken

  try {
    connectToDb();
    const newUser: HydratedDocument<IUser> = new User({
      username,
      email,
      password,
      img,
      isAdmin: Boolean(isAdmin),
    });
    await newUser.save();
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (id: string) => {
  try {
    connectToDb();
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const handleGithubLogin = async () => {
  await signIn("github");
};

export const handleLogout = async () => {
  await signOut();
};

export const register = async (
  currentState: { error: string } | { success: boolean } | undefined,
  formData: FormData
) => {
  const { username, email, password, confirm } = Object.fromEntries(formData);

  if (password !== confirm) {
    return { error: "Passwords do not match!" };
  }

  try {
    connectToDb();
    const user = await User.findOne({ username });

    if (user) {
      return { error: "Username already exists" };
    }

    const hashed = await bcrypt.hash(String(password), 10);

    const newUser = new User({
      username,
      email,
      password: hashed,
    });
    await newUser.save();
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
};

export const login = async (
  currentState: { error: string } | undefined,
  formData: FormData
) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid username or password" };
    }
    throw error;
  }
};
