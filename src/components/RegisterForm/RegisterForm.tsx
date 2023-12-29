"use client";
import { register } from "@/lib/actions";
import styles from "./registerform.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form action={formAction} className={styles.form}>
      <input type="text" placeholder="Enter a username..." name="username" />
      <input type="email" placeholder="Enter your email..." name="email" />
      <input
        type="password"
        placeholder="Create a password..."
        name="password"
      />
      <input type="password" placeholder="Confirm password..." name="confirm" />
      <button type="submit">Register</button>
      {state?.error}
      <Link href="/login">
        Have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
