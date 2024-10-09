import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

import useRedirectIfNotLoggedIn from "../hooks/useRedirectIfNotLoggedIn";
import { Card, Container as BaseContainer } from "../styles/styles";

export default function Home() {
	useRedirectIfNotLoggedIn();
	const navigate = useNavigate();

	const [currentChat, setCurrentChat] = useState(undefined);
	const [currentUser, setCurrentUser] = useState({});

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const user = await JSON.parse(
					localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
				);

				if (!user.avatarImage) navigate("/profile");
				else setCurrentUser(user);
			} catch (error) {
				console.log("Fetching all users error: ", error);
			}
		};

		getCurrentUser();
	}, []);

	return (
		<Container>
			<Card>
				<Contacts
					changeChat={handleChatChange}
					user={currentUser}
				/>
				{currentChat === undefined ? (
					<Welcome user={currentUser} />
				) : (
					<ChatContainer
						currentChat={currentChat}
						user={currentUser}
					/>
				)}
			</Card>
		</Container>
	);
}

const Container = styled(BaseContainer)`
	gap: 1rem;
`;
