"use client";
import { useFormState } from "react-dom";
import styles from "./adminuserform.module.css";
import { createUser } from "@/lib/actions";

const AdminPostForm = () => {
  const [state, formAction] = useFormState(createUser, undefined);

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New User</h1>
      <input type="text" placeholder="Enter a username..." name="username" />
      <input type="email" placeholder="Enter an email..." name="email" />
      <input
        type="password"
        placeholder="Enter a password..."
        name="password"
      />
      <input type="file" name="img" disabled />
      <select name="isAdmin">
        <option value="false">isAdmin</option>
        <option value="false">No</option>
        <option value="true">Yes</option>
      </select>
      <button type="submit">Create User</button>
      {state?.error}
    </form>
  );
};

export default AdminPostForm;
