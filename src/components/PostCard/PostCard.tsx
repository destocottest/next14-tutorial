import Image from "next/image";
import styles from "./postcard.module.css";
import Link from "next/link";
import { IPost } from "@/lib/models";
import { HydratedDocument } from "mongoose";

const PostCard = ({ post }: { post: HydratedDocument<IPost> }) => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            src={post.img ? post.img : "/nopostimg.png"}
            alt=""
            fill
            className={styles.img}
          />
        </div>
        <span className={styles.date}>01.01.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.desc}>{post.desc}</p>
        <Link className={styles.link} href={`/blog/${post.slug}`}>
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
