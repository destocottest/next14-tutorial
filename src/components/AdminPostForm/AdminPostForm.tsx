"use client";
import { useFormState } from "react-dom";
import styles from "./adminpostform.module.css";
import { createPost } from "@/lib/actions";

const AdminPostForm = ({ userId }: { userId: string }) => {
  const [state, formAction] = useFormState(
    createPost.bind(null, userId),
    undefined
  );

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="text" placeholder="Enter a title..." name="title" />
      <textarea
        name="desc"
        cols={30}
        rows={10}
        placeholder="Enter a description..."
      ></textarea>
      <button type="submit">Create Post</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
