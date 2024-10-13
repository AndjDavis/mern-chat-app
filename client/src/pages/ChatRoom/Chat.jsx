import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import ChatContainer from "../Chat/components/ChatContainer";
import Contacts from "./components/Contacts";
import Welcome from "./components/Welcome";
import Loader from "../../components/Loader";
import { useUser } from "../../hooks";

import { Card, Container as BaseContainer } from "../../styles/styles";

export default function Chat() {
	const { user, isLoading } = useUser();
	const navigate = useNavigate();

	const [chatRecipient, setChatRecipient] = useState();

	const handleChangeConversation = (newChatRecipient) => {
		setChatRecipient(newChatRecipient);
	};

	// TODO: Add default instead of navigating away
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
