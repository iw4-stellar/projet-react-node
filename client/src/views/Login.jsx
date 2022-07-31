import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultHeader from "../components/DefaultHeader";
import useFetch from "../hooks/useFetch";
import useField from "../hooks/useField";
import useForm from "../hooks/useForm";
import useLocalStorage from "../hooks/useLocalStorage";
import styles from "../styles/Login.module.css";

export default function Login() {
  const [user, saveUser] = useLocalStorage("user");
  const [form, handleFormChange] = useForm({
    email: "",
    password: "",
  });
  const [rememberMe, handleRememberChange] = useField(false);
  const [error, setError] = useState(null);
  const [login, isLoading] = useFetch("/api/auth/login");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const body = JSON.stringify(form);
    const data = await login({
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
      saveUser(data.user);

      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <div id={styles.login}>
      <DefaultHeader />

      <main>
        <div id={styles.form_card}>
          <div className={styles.form_card__header}>
            <h1 className="h1">Log in</h1>

            {error && (
              <div className="alert is-danger">
                {error === "credentials" && <p>Invalid credentials</p>}
                {error === "server" && <p>Internal error</p>}
              </div>
            )}
          </div>

          <div className={styles.form_card__body}>
            <form id={styles.form} onSubmit={handleSubmit}>
              <input
                required
                className="input is-text"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleFormChange}
                disabled={isLoading}
              />
              <input
                required
                className="input is-text"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleFormChange}
                disabled={isLoading}
              />

              <div className="input is-checkbox">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  value={rememberMe}
                  onChange={handleRememberChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>

              {isLoading ? (
                <div className="loader mx-auto"></div>
              ) : (
                <button className="button is-primary">Sign in</button>
              )}
            </form>
          </div>
          <div className={styles.form_card__footer}>
            <Link to="/register" className="button is-text is-primary w-full">
              I don't have an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
