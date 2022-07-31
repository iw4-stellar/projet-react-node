import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DefaultHeader from "../components/DefaultHeader";
import useFetch from "../hooks/useFetch";
import useField from "../hooks/useField";
import useLocalStorage from "../hooks/useLocalStorage";
import useForm from "../hooks/useForm";
import styles from "../styles/Register.module.css";

export default function Register() {
  const [user, saveUser] = useLocalStorage("user");
  const [form, handleFormChange] = useForm({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, handleConfirmPasswordChange] = useField("");
  const [agreeTerms, handleAgreeTermsChange] = useField(false);
  const [error, setError] = useState(null);
  const [register, isLoading] = useFetch("/api/auth/register");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (form.password.length < 8 || form.password.length > 12) {
      setError("password");
    } else if (form.password !== confirmPassword) {
      setError("confirmPassword");
      document.querySelector("#confirmPassword").focus();
    } else if (!agreeTerms) {
      setError("agreeTerms");
    }

    const body = JSON.stringify(form);
    const data = await register({
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (data.error) {
      setError(data.error.reason);
    } else {
      setError(null);
      saveUser(data.user);
      navigate("/");
    }
  };

  return (
    <div id={styles.register}>
      <DefaultHeader />

      <main>
        <div id={styles.form_card}>
          <div className={styles.form_card__header}>
            <h1 className="h1">Register</h1>

            {error && (
              <div className="alert is-danger">
                {error === "email" && <p>Email already in use</p>}
                {error === "password" && (
                  <p>Pasword should be 8 - 12 characters long</p>
                )}
                {error === "confirmPassword" && <p>Paswords don't match</p>}
                {error === "agreeTerms" && <p>You must agree terms</p>}
                {error === "server" && <p>Internal error</p>}
              </div>
            )}
          </div>
          <div className={styles.form_card__body}>
            <form id={styles.form} onSubmit={handleSubmit}>
              <input
                required
                className="input is-text"
                type="name"
                id="name"
                name="name"
                placeholder="Fullname"
                value={form.name}
                onChange={handleFormChange}
                disabled={isLoading}
              />
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
              <div>
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

                <p className="input-helper">8 - 12 characters</p>
              </div>
              <input
                required
                className="input is-text"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                disabled={isLoading}
              />
              <div className="input is-checkbox">
                <input
                  required
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={agreeTerms}
                  onChange={handleAgreeTermsChange}
                  disabled={isLoading}
                />
                <label htmlFor="agreeTerms">Agree terms</label>
              </div>

              {isLoading ? (
                <div className="loader mx-auto" />
              ) : (
                <button className="button is-primary">Register</button>
              )}
            </form>
          </div>
          <div className={styles.form_card__footer}>
            <Link to="/login" className="button is-text is-primary w-full">
              I already have an account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
