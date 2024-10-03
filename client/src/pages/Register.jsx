import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../assets/logo.svg";
import { toastOptions } from "../utils/constants";

const initialState = {
	username: "",
	email: "",
	password: "",
	confirmPassword: "",
};

export default function Register() {
	const [values, setValues] = useState(initialState);
	const handleChange = (e) => {
		setValues((currentValues) => ({
			...currentValues,
			[e.target.name]: e.target.value,
		}));
	};

	const handleValidation = () => {
		const { email, password, confirmPassword, username } = values;
		if (password !== confirmPassword) {
			toast.error("Your passwords don't match!", toastOptions);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		handleValidation();
	};

	return (
		<>
			<FormContainer>
				<form action="" onSubmit={handleSubmit}>
					<div className="brand">
						<img
							src={Logo}
							alt="logo"
						/>
						<h1>snappy</h1>
					</div>
					<input
						type="text"
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={values.email}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={values.password}
					/>
					<input
						type="password"
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
