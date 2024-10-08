import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormLogo from "../components/FormLogo";
import {
	StyledContainer,
	StyledForm,
	StyledInput,
	StyledSpan,
} from "../styles/form-styles";
import { SubmitButton } from "../styles/styles";
import { toastOptions } from "../utils/constants";
import { registerNewUser } from "../services/authService";
import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";

const initialState = {
	username: "test user",
	email: "example@example.com",
	password: "testtest",
	confirmPassword: "testtest",
};

const usernameMinLength = 3;
const pwMinLength = 8;

export default function Register() {
	useRedirectIfLoggedIn();
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
				toast.error(data.message, toastOptions);
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
			<StyledContainer>
				<StyledForm onSubmit={handleSubmit}>
					<FormLogo />
					<StyledInput
						type="text"
						required
						minLength={usernameMinLength}
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
					<StyledInput
						type="email"
						required
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={values.email}
					/>
					<StyledInput
						type="password"
						required
						minLength={pwMinLength}
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={values.password}
					/>
					<StyledInput
						type="password"
						required
						minLength={pwMinLength}
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={handleChange}
						value={values.confirmPassword}
					/>
					<SubmitButton type="submit">Create New User</SubmitButton>
					<StyledSpan>
						Already Have an account?
						<Link to="/login"> Login </Link>
					</StyledSpan>
				</StyledForm>
			</StyledContainer>
			<ToastContainer />
		</>
	);
}
