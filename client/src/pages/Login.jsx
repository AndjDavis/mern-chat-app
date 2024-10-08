import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

import Logo from "../components/Logo";
import {
	Button,
	Container as BaseContainer,
	Form,
	Input,
	Span,
} from "../styles/styles";
import { loginUser } from "../services/authService";
import { toastOptions } from "../utils/constants";
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";

const initialState = {
	username: "andjdavis",
	password: "testtest",
};

export default function Login() {
	useRedirectIfLoggedIn();
	const navigate = useNavigate();
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
			const formData = { ...values };
			const { data, status } = await loginUser(formData);
			if (data?.success && status === 200) {
				localStorage.setItem(
					process.env.REACT_APP_LOCALHOST_KEY,
					JSON.stringify(data.user)
				);

				navigate("/");
			} else if (status === 401) {
				toast.error(data.message, toastOptions);
			} else {
				const failMessage = data?.message || "Something went wrong...";
				toast.error(failMessage, toastOptions);
			}
		} catch (error) {
			console.log("Login Form Error: ", error);
			toast.error("An error occurred during login", toastOptions);
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
					<Button type="submit">Log In</Button>
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
