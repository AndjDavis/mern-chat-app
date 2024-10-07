import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormLogo from "../components/FormLogo";
import {
	StyledButton,
	StyledContainer,
	StyledForm,
	StyledInput,
	StyledSpan,
} from "../styles/form-styles";
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
			<StyledContainer>
				<StyledForm onSubmit={handleSubmit}>
					<FormLogo />
					<StyledInput
						type="text"
						required
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
					<StyledInput
						type="password"
						required
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={values.password}
					/>
					<StyledButton type="submit">Log In</StyledButton>
					<StyledSpan>
						Don't have an account ? <Link to="/register">Create One.</Link>
					</StyledSpan>
				</StyledForm>
			</StyledContainer>
			<ToastContainer />
		</>
	);
}
