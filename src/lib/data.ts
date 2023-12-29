import { HydratedDocument, SchemaTimestampsConfig } from "mongoose";
import { IPost, IUser, Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
  try {
    connectToDb();
    const posts: HydratedDocument<IPost>[] = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

export const getPost = async (slug: string) => {
  try {
    connectToDb();
    const post: HydratedDocument<IPost & SchemaTimestampsConfig> | null =
      await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users: HydratedDocument<IUser>[] = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};
export const getUser = async (id: string) => {
  noStore();
  try {
    connectToDb();
    const user: HydratedDocument<IUser> | null = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user!");
  }
};
