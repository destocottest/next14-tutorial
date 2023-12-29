"use client";
import { login } from "@/lib/actions";
import styles from "./loginform.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="Enter a username..." name="username" />
      <input
        type="password"
        placeholder="Create a password..."
        name="password"
      />
      <button type="submit">Login</button>
      {state?.error}
      <Link href="/register">
        Don&apos;t have an account? <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
