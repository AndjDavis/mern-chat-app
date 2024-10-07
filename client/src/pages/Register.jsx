import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../assets/logo.svg";
import { toastOptions } from "../utils/constants";
import { registerNewUser } from "../services/authService";

const initialState = {
	username: "test user",
	email: "example@example.com",
	password: "testtest",
	confirmPassword: "testtest",
};

const usernameMinLength = 3;
const pwMinLength = 8;

export default function Register() {
	const navigate = useNavigate();
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
			toastMessage = "Passwords do not match!";
		}

		if (!toastMessage) return true;
		toast.error(toastMessage, toastOptions);
		return false;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValid = handleValidation();
		if (!isValid) return;

		try {
			const { confirmPassword, ...formData } = values;
			const { data, status } = await registerNewUser(formData);

			if (data?.success && status === 201) {
				localStorage.setItem(
					process.env.REACT_APP_LOCALHOST_KEY,
					JSON.stringify(data.user)
				);
				navigate("/");
			} else if (status === 409) {
				toast.error("Email or username already exists", toastOptions);
			} else {
				const failMessage = data?.message || "Something went wrong...";
				toast.error(failMessage, toastOptions);
			}
		} catch (error) {
			console.log("Register Form Error: ", error);
			toast.error("An error occurred during registration", toastOptions);
		}
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
