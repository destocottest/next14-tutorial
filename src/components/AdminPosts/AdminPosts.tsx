import { getPosts } from "@/lib/data";
import styles from "./adminposts.module.css";
import Image from "next/image";
import { deletePost } from "@/lib/actions";
import Link from "next/link";

const AdminPosts = async () => {
  const posts = await getPosts();
  return (
    <div className={styles.container}>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className={styles.post} key={post.id}>
          <div className={styles.detail}>
            <Image
              src={post.img ?? "/nopostimg.png"}
              alt=""
              width={50}
              height={50}
            />
            <Link href={`/blog/${post.slug}`} className={styles.postTitle}>
              {post.title}
            </Link>
          </div>
          <form action={deletePost.bind(null, post.id)}>
            <button className={styles.postButton} type="submit">
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPosts;
