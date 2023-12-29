import PostCard from "@/components/PostCard/PostCard";
import styles from "./blog.module.css";
import { getPosts } from "@/lib/data";
import { Metadata } from "next";
import Link from "next/link";
import { IPost } from "@/lib/models";
import { HydratedDocument } from "mongoose";

export const metadata: Metadata = {
  title: "Blog Page",
  description: "Blog description",
};

// const BASE_PATH = "http://localhost:3000";

// const getData = async () => {
//   const res = await fetch(`${BASE_PATH}/api/blog`, {
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// };

const BlogPage = async () => {
  const posts = await getPosts();
  // const posts: HydratedDocument<IPost>[] = await getData();

  return (
    <div className={styles.container}>
      {/* <Link href="/blog/create" className={styles.create}>
        <h1>+</h1>
      </Link> */}
      {posts.length > 0 &&
        posts.map((post) => (
          <div className={styles.post} key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
    </div>
  );
};

export default BlogPage;
