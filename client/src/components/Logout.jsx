import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";

import { logUserOut } from "../services/authService.js";

export default function Logout({ user }) {
	const navigate = useNavigate();

	const handleClick = async () => {
		try {
			const { data } = await logUserOut(user._id);
			if (data.status === 200) {
				localStorage.clear();
				navigate("/login");
			}
		} catch (error) {
			console.log("Something went wrong while logging you out...", error);
		}
	};

	return (
		<Button onClick={handleClick}>
			<BiPowerOff />
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
