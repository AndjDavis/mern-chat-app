import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserProvider";

import { Card, Container as BaseContainer } from "../styles/styles";

export default function ChatRoom() {
	const { user, isLoading } = useContext(UserContext);
	const navigate = useNavigate();

	const [chatRecipient, setChatRecipient] = useState();

	const handleChangeConversation = (newChatRecipient) => {
		setChatRecipient(newChatRecipient);
	};

	useEffect(() => {
		if (user && !user?.avatarImage) navigate("/profile");
	}, []);

	if (isLoading) {
		return (
			<Container>
				<Loader />
			</Container>
		);
	}

	return (
		<Container>
			<Card>
				<Contacts
					chatRecipient={chatRecipient}
					changeConversation={handleChangeConversation}
					user={user}
				/>
				{chatRecipient === undefined ? (
					<Welcome user={user} />
				) : (
					<ChatContainer
						chatRecipient={chatRecipient}
						user={user}
					/>
				)}
			</Card>
			<ToastContainer />
		</Container>
	);
}

const Container = styled(BaseContainer)`
	gap: 1rem;
`;
