import mongoose from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password?: string;
  img?: string;
  isAdmin: boolean;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export interface IPost {
  title: string;
  desc: string;
  img?: string;
  userId: string;
  slug: string;
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export const Post =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
