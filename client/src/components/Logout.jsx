import { BiLogOutCircle } from "react-icons/bi";
import styled from "styled-components";
import { toast } from "react-toastify";

import { useAuth } from "../hooks";
import { toastOptions } from "../constants";

export default function Logout() {
	const { signOut } = useAuth();

	const handleClick = async () => {
		try {
			await signOut();
		} catch (error) {
			console.log("Logout Error...", error.message);
			toast.error(
				`Oops, we're having a problem signing you out... ${error.message}`,
				toastOptions
			);
		}
	};

	return (
		<Button onClick={handleClick}>
			<BiLogOutCircle />
		</Button>
	);
}

const Button = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: #9a86f3;
	border: none;
	cursor: pointer;
	svg {
		font-size: 1.3rem;
		color: #ebe7ff;
	}
`;
