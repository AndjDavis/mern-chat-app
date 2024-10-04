import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../assets/logo.svg";
import routes from "../utils/routes";
import { toastOptions } from "../utils/constants";

const initialState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};
const usernameMinLength = 3;
const pwMinLength = 8;

export default function Register() {
	const [values, setValues] = useState(initialState);
	const handleChange = (e) => {
		setValues((currentValues) => ({
			...currentValues,
			[e.target.name]: e.target.value,
		}));
	};

	const handleValidation = () => {
		const { confirmPassword, password } = values;
		let toastMessage = null;
		if (password !== confirmPassword) {
			toastMessage = "Your passwords don't match!";
		}

		if (!toastMessage) return true;
		toast.error(toastMessage, toastOptions);
		return false;
	};

	const handleRequest = async () => {
		const { email, password, username } = values;
		const { data } = await axios.post(routes.registerRoute, {
			username,
			email,
			password,
		});
		console.log("Register Data", data);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const isValid = handleValidation();
		if (!isValid) return;

		handleRequest();
	};

	return (
		<>
			<FormContainer>
				<form
					action=""
					onSubmit={handleSubmit}
				>
					<div className="brand">
						<img
							src={Logo}
							alt="logo"
						/>
						<h1>snappy</h1>
					</div>
					<input
						type="text"
						required
						minLength={usernameMinLength}
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
					<input
						type="email"
						required
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={values.email}
					/>
					<input
						type="password"
						required
						minLength={pwMinLength}
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={values.password}
					/>
					<input
						type="password"
						required
						minLength={pwMinLength}
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={handleChange}
						value={values.confirmPassword}
					/>
					<button type="submit">Create New User</button>
					<span>
						Already Have an account?
						<Link to="/login"> Login </Link>
					</span>
				</form>
			</FormContainer>
			<ToastContainer />
		</>
	);
}

const FormContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		img {
			height: 5rem;
		}
		h1 {
			color: white;
			text-transform: uppercase;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		background-color: #00000076;
		border-radius: 2rem;
		padding: 3rem 5rem;
	}
	input {
		background-color: transparent;
		padding: 1rem;
		border: 0.1rem solid #4e0eff;
		border-radius: 0.4rem;
		color: white;
		width: 100%;
		font-size: 1rem;
		&:focus {
			border: 0.1rem solid #997af0;
			outline: none;
		}
	}
	button {
		background-color: #4e0eff;
		color: white;
		padding: 1rem 2rem;
		border: none;
		font-weight: bold;
		cursor: pointer;
		border-radius: 0.4rem;
		font-size: 1rem;
		text-transform: uppercase;
		&:hover {
			background-color: #4e0eff;
		}
	}
	span {
		color: white;
		text-transform: uppercase;
		a {
			color: #4e0eff;
			text-decoration: none;
			font-weight: bold;
		}
	}
`;
