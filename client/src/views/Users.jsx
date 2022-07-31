import { useEffect, useMemo, useState } from "react";
import ChatIcon from "../components/Icons/ChatIcon";
import UserAdd from "../components/Icons/UserAdd";
import UsersIcon from "../components/Icons/UsersIcon";
import useFetch from "../hooks/useFetch";
import styles from "../styles/Users.module.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [getUsers, isUsersLoading] = useFetch("/api/users");

  const userList = useMemo(() => {
    return (
      <div className={styles.user_list}>
        {users &&
          users.map((user) => (
            <div className={styles.user}>
              <div className={styles.user__details}>
                <h2 className={styles.user__name}>{user.name}</h2>
                <p className={styles.user__email}>{user.email}</p>
              </div>
              <div>
                <button className="button is-icon is-text is-primary">
                  <UserAdd />
                </button>
                <button className="button is-icon is-text is-success">
                  <ChatIcon />
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }, [users]);
  const userCount = useMemo(() => {
    return users.length;
  }, [users]);

  useEffect(() => {
    (async () => {
      setUsers(await getUsers());
    })();
  }, []);

  return (
    <div id={styles.users}>
      <div className={styles.users__header}>
        <div className={styles.heading}>
          <UsersIcon />
          <h1 className="h1">Users</h1>
        </div>
        {!isUsersLoading && <p>{userCount} user(s)</p>}
      </div>
      <div className={styles.users__body}>
        {isUsersLoading ? <div className="mx-auto loader" /> : userList}
      </div>
    </div>
  );
}
