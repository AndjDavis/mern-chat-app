import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BiChat } from "react-icons/bi";
import { paths } from "../constants";

export default function ChatRoomButton() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const handleClick = () => {
		navigate(paths.CHAT);
	};

	if (pathname === paths.CHAT) return null;

	return (
		<Button onClick={handleClick}>
			<BiChat />
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
