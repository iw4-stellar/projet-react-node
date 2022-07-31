import UserIcon from "../components/Icons/UserIcon";
import styles from "../styles/Profile.module.css";
import useLocalStorage from "../hooks/useLocalStorage";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import useField from "../hooks/useField";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, saveUser] = useLocalStorage("user");
  const [form, handleFormChange, setForm] = useForm({
    name: "",
    email: "",
    password: "",
    newPassword: "",
  });
  const [confirmPassword, handleConfirmPasswordChange] = useField("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [requestUser, isLoading] = useFetch(`/api/users/${user.id}`);

  const getUser = async () => {
    const data = await requestUser({
      method: "GET",
    });

    if (data.error) {
      setError(data.error.reason);
    } else {
      setForm({
        ...form,
        email: data.user.email,
        name: data.user.name,
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(false);
    setError(null);

    if (form.newPassword !== confirmPassword) {
      setError("confirmPassword");
      return;
    }

    if (confirm("Are you sure?")) {
      const body = JSON.stringify(form);
      const data = await requestUser({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (data.error) {
        setError(data.error.reason);
      } else {
        setError(null);
        setSuccess(true);
        saveUser(data.user);
      }
    }
  };

  return (
    <div id={styles.profile}>
      <div className={styles.profile__header}>
        <div className={styles.heading}>
          <UserIcon />
          <h1 className="h1">Profile</h1>
        </div>

        <p className="mb-2">Last updated at: {user.updatedAt}</p>

        {success && (
          <div className="alert is-success">
            <p>Profile information updated successfully !</p>
          </div>
        )}
        {error && (
          <div className="alert is-danger w-72">
            {error === "email" && <p>Email already in use</p>}
            {error === "credentials" && <p>Invalid credentials</p>}
            {error === "confirmPassword" && <p>New passwords don't match</p>}
            {error === "server" && <p>Internal error</p>}
          </div>
        )}
      </div>

      <div className={styles.profile__body}>
        <form id={styles.profile_form} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Fullname"
              className="input is-text"
              value={form.name}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="input is-text"
              value={form.email}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Current password</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              placeholder="Current password"
              className="input is-text"
              value={form.password}
              onChange={handleFormChange}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="New password"
              className="input is-text"
              value={form.newPassword}
              onChange={handleFormChange}
              disabled={isLoading}
            />
            <p className="input-helper">8 - 12 characters</p>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm new password</label>
            <input
              className="input is-text"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              disabled={isLoading}
            />
          </div>

          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <button className="button is-primary">Save</button>
          )}
        </form>
      </div>
    </div>
  );
}
