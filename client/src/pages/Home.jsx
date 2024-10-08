import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";

import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import useRedirectIfNotLoggedIn from "../hooks/useRedirectIfNotLoggedIn";
import { Card, Container as BaseContainer } from "../styles/styles";
import { socketChannels } from "../utils/constants";
import routes from "../utils/routes";

export default function Home() {
	useRedirectIfNotLoggedIn();
	const navigate = useNavigate();
	const socket = useRef();

	const [currentChat, setCurrentChat] = useState(undefined);
	const [currentUser, setCurrentUser] = useState({});

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	useEffect(() => {
		const getUserOffLocalStorage = async () => {
			try {
				const user = await JSON.parse(
					localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
				);
				if (!user) {
					console.log("Missing user on local storage");
					return;
				}

				if (!user.avatarImage) navigate("/profile");
				else setCurrentUser(user);
			} catch (error) {
				console.log("Fetching all users error: ", error);
			}
		};

		getUserOffLocalStorage();
	}, [navigate]);

	useEffect(() => {
		if (currentUser?._id) {
			socket.current = io(routes.host);
			socket.current.emit(socketChannels.add, currentUser._id);
		}
	}, [currentUser]);

	return (
		<Container>
			<Card>
				<Contacts
					user={currentUser}
					changeChat={handleChatChange}
				/>
				{currentChat === undefined ? (
					<Welcome user={currentUser} />
				) : (
					<ChatContainer
						currentChat={currentChat}
						socket={socket}
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
