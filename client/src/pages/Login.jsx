import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../components/Logo";
import { UserContext } from "../context/UserProvider";
import {
	Button,
	Container as BaseContainer,
	Form,
	Input,
	Span,
} from "../styles/styles";
import { toastOptions } from "../constants";
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";

// TODO: Dev Only
const testUsers = [
	"TylerTrex",
	"TroyTbone",
	"TrainTed",
	"TeleTvision",
	"TuckerTired",
	"ToyTrombone",
	"andjdavis",
];

const initialState = {
	username: testUsers[Math.floor(Math.random() * testUsers.length)],
	password: "testtest",
};

// const initialRoute = { from: { pathname: "/" } };

export default function Login() {
	const { signIn, isLoading } = useContext(UserContext);
	useRedirectIfLoggedIn();

	const [values, setValues] = useState(initialState);

	const handleChange = (e) => {
		setValues((currentValues) => ({
			...currentValues,
			[e.target.name]: e.target.value,
		}));
	};

	const validateForm = () => {
		const { username, password } = values;
		let message = null;
		if (username === "") {
			message = "Email and Password is required.";
		} else if (password === "") {
			message = "Email and Password is required.";
		}

		if (!message) return true;

		toast.error(message, toastOptions);
		return false;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const isValid = validateForm();
		if (!isValid) return;

		try {
			const credentials = { ...values };
			await signIn(credentials);
		} catch (error) {
			console.log("Login error: ", error);
			toast.error(
				`An error occurred during login... ${error.message}`,
				toastOptions
			);
		}
	};

	return (
		<>
			<Container>
				<Form onSubmit={handleSubmit}>
					<Logo />
					<Input
						type="text"
						required
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
					<Input
						type="password"
						required
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={values.password}
					/>
					<Button
						type="submit"
						disabled={isLoading}
					>
						Log In
					</Button>
					<Span>
						Don't have an account ? <Link to="/register">Create One.</Link>
					</Span>
				</Form>
			</Container>
			<ToastContainer />
		</>
	);
}

const Container = styled(BaseContainer)`
	gap: 1rem;
`;
