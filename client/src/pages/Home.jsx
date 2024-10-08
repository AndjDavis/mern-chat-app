import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { io } from "socket.io-client";

import routes from "../utils/routes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import useRedirectIfNotLoggedIn from "../hooks/useRedirectIfNotLoggedIn";
import { getAllUsers } from "../services/userService";
import { Card, Container as BaseContainer } from "../styles/styles";

export default function Home() {
	useRedirectIfNotLoggedIn();

	const navigate = useNavigate();
	const socket = useRef();
	const [contacts, setContacts] = useState([]);
	const [currentChat, setCurrentChat] = useState(undefined);

	const handleChatChange = (chat) => {
		setCurrentChat(chat);
	};

	useEffect(() => {
		const fetchAllUsers = async () => {
			try {
				const user = await JSON.parse(
					localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
				);
				if (!user) {
					console.log("Missing user on local storage");
					return;
				}

				if (!user.avatarImage) navigate("/profile");
				else {
					socket.current = io(routes.host);
					socket.current.emit("add-user", user._id);

					const { data } = await getAllUsers(user._id);
					if (data?.success && data?.users) {
						setContacts(data.users);
					}
				}
			} catch (error) {
				console.log("Fetching all users error: ", error);
			}
		};

		fetchAllUsers();
		console.log("Chat UseEffect being called...");
	}, [navigate]);

	return (
		<Container>
			<Card>
				<Contacts
					contacts={contacts}
					changeChat={handleChatChange}
				/>
				{currentChat === undefined ? (
					<Welcome />
				) : (
					<ChatContainer
						currentChat={currentChat}
						socket={socket}
					/>
				)}
			</Card>
		</Container>
	);
}

const Container = styled(BaseContainer)`
	gap: 1rem;
`;
