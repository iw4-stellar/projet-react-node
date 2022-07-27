import "../styles/Register.css";
import React, { useState } from "react";
import AuthService from "../services/auth";

function Register(props) {
    const [user, setUser] = useState({ email: "", password: "", firstName: "", lastName: "", pathway: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    function onInputChange(event) {
        setUser({ ...user, [event.target.name]: event.target.value });
    }

    function onConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function onSubmit(event) {
        event.preventDefault();

        if (user.password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        AuthService.register(user)
            .then((res) => {
                setMessage(res.data.message);
            }).catch(error => {
                setMessage(error.response.data.message);
            }
            );
    }

    return (
        <div>
            {/*<h1>Register</h1>*/}
            <form onSubmit={onSubmit}>
                <div className="Register">
                    <label>Email</label>
                    <input type="email" value={user.email} name="email" onChange={(event) => onInputChange(event)} required />

                    <label>Password</label>
                    <input type="password" value={user.password} name="password" onChange={(event) => onInputChange(event)} required />

                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} name="confirmPassword" onChange={(event) => onConfirmPasswordChange(event)} required />

                    <label>First Name</label>
                    <input type="text" value={user.firstName} name="firstName" onChange={(event) => onInputChange(event)} required />

                    <label>Last Name</label>
                    <input type="text" value={user.lastName} name="lastName" onChange={(event) => onInputChange(event)} required />

                    <label>Pathway</label>
                    <select value={user.pathway} name="pathway" onChange={(event) => onInputChange(event)} required className="select-path">
                        <option value="">Select a pathway</option>
                        <option value="Architecture des Logiciels">Architecture des Logiciels</option>
                        <option value="Ingénierie du Web">Ingénierie du Web</option>
                        <option value="Ingénierie de la Blockchain">Ingénierie de la Blockchain</option>
                        <option value="Sécurité Informatique">Sécurité Informatique</option>
                    </select>

                    <button className="register-button" type="submit">Register</button>
                    <input type="Submit" value = "Register" className="register-button" />

                    {message && <p>{message}</p>}
                </div>
            </form>
        </div>
    );
}

export default Register;