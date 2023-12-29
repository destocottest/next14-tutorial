import { getUsers } from "@/lib/data";
import styles from "./adminusers.module.css";
import Image from "next/image";
import { deleteUser } from "@/lib/actions";

const AdminUsers = async () => {
  const users = await getUsers();

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users.map((user) => (
        <div className={styles.user} key={user.id}>
          <div className={styles.detail}>
            <Image
              src={user.img ?? "/noavatar.png"}
              alt=""
              width={50}
              height={50}
            />
            <span>{user.username}</span>
          </div>
          <form action={deleteUser.bind(null, user.id)}>
            <button className={styles.userButton} type="submit">
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminUsers;
