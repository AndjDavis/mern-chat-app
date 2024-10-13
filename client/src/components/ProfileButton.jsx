import styled from "styled-components";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";

import { paths } from "../constants";

export default function ProfileButton() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleClick = () => {
		navigate(paths.PROFILE);
	};

	if (pathname === paths.PROFILE) return null;
	return (
		<Button onClick={handleClick}>
			<BiUserCircle />
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
