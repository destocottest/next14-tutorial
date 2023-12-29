"use client";
import Link from "next/link";
import styles from "./navlink.module.css";
import { usePathname } from "next/navigation";

type ItemType = {
  title: string;
  path: string;
};

const NavLink = ({ item }: { item: ItemType }) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathname === item.path && styles.active
      }`}
    >
      {item.title}
    </Link>
  );
};

export default NavLink;
