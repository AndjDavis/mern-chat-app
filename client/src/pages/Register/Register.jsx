import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "../../components/Logo";
import { Button, Container, Form, Input, Span } from "../../styles/styles";
import { toastOptions, paths } from "../../constants";

import { UserContext } from "../../context/UserProvider";

const initialState = {
	username: "test user",
	email: "example@example.com",
	password: "testtest",
	confirmPassword: "testtest",
};

const usernameMinLength = 3;
const pwMinLength = 8;

export default function Register() {
	const { register } = useContext(UserContext);

	const [values, setValues] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setValues((currentValues) => ({
			...currentValues,
			[e.target.name]: e.target.value,
		}));
	};

	const handleValidation = () => {
		const { confirmPassword, password } = values;

		let toastMsg = null;
		if (password !== confirmPassword) {
			toastMsg = "Passwords do not match!";
		}

		if (!toastMsg) return true;

		toast.error(toastMsg, toastOptions);
		return false;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const isValid = handleValidation();
		if (!isValid) return;
		setIsLoading(true);

		try {
			const { confirmPassword, ...registration } = values;
			await register(registration);
		} catch (error) {
			console.log("Registration error: ", error);
			toast.error(
				`An error occurred during registration... ${error.message}`,
				toastOptions
			);
		} finally {
			setIsLoading(false);
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
						minLength={usernameMinLength}
						placeholder="Username"
						name="username"
						onChange={handleChange}
						value={values.username}
					/>
					<Input
						type="email"
						required
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={values.email}
					/>
					<Input
						type="password"
						required
						minLength={pwMinLength}
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={values.password}
					/>
					<Input
						type="password"
						required
						minLength={pwMinLength}
						placeholder="Confirm Password"
						name="confirmPassword"
						onChange={handleChange}
						value={values.confirmPassword}
					/>
					<Button
						type="submit"
						disabled={isLoading}
					>
						Create New User
					</Button>
					<Span>
						Already Have an account?
						<Link to={paths.LOGIN}> Login </Link>
					</Span>
				</Form>
			</Container>
			<ToastContainer />
		</>
	);
}
