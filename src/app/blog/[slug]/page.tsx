import Image from "next/image";
import styles from "./singlepost.module.css";
import PostUser from "@/components/PostUser/PostUser";
import { Suspense } from "react";
import { getPost } from "@/lib/data";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const { slug } = params;
  const post = await getPost(slug);

  return {
    title: post?.title,
    description: post?.desc,
  };
};

// const BASE_PATH = "http://localhost:3000";
// const getData = async (slug: string) => {
//   const res = await fetch(`${BASE_PATH}/api/blog/${slug}`);
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }
//   return res.json();
// };

const SinglePostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const post = await getPost(slug);
  // const post = await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={post?.img ? post.img : "/nopostimg.png"}
          alt=""
          fill
          className={styles.image}
        />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post?.title}</h1>
        <div className={styles.detail}>
          {post && (
            <Suspense fallback={<div>Loading...</div>}>
              <PostUser userId={post.userId} />
            </Suspense>
          )}
          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>
            <span className={styles.detailValue}>
              {post?.createdAt?.toString().slice(0, 10)}
            </span>
          </div>
        </div>
        <div className={styles.content}>{post?.desc}</div>
      </div>
    </div>
  );
};

export default SinglePostPage;
