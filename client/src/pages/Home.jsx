import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";

import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";

import useRedirectIfNotLoggedIn from "../hooks/useRedirectIfNotLoggedIn";
import { Card, Container as BaseContainer } from "../styles/styles";

export default function Home() {
	useRedirectIfNotLoggedIn();
	const navigate = useNavigate();

	const [chatRecipient, setChatRecipient] = useState();
	// TODO: Pull this of a global store.
	const [currentUser, setCurrentUser] = useState({});

	const handleChangeConversation = (newChatRecipient) => {
		setChatRecipient(newChatRecipient);
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
					chatRecipient={chatRecipient}
					changeConversation={handleChangeConversation}
					user={currentUser}
				/>
				{chatRecipient === undefined ? (
					<Welcome user={currentUser} />
				) : (
					<ChatContainer
						chatRecipient={chatRecipient}
						user={currentUser}
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
