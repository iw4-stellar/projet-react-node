import React, { useState } from "react";
import AuthService from "../services/auth";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	function handleSubmit(e) {
		e.preventDefault();

		setLoading(true);
		setMessage("");

		AuthService.login(email, password)
			.then(res => {
				props.history.push("/");
				window.location.reload();
			})
			.catch(err => {
				setMessage(err.response.data.message);
			})
			.finally(() => setLoading(false));
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div >
					<label htmlFor="password">Password</label>
					<input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<button type="submit">Login</button>
				{message && <p>{message}</p>}
			</form>
		</div>
	);
}

export default Login;