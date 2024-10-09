import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";

import { fetchMessages, postMessage } from "../services/messageService";
import { TitleWrapper, AvatarContainer } from "../styles/styles";
import { chatEvents } from "../utils/constants";
import routes from "../utils/routes";

export default function ChatContainer({ currentChat, user }) {
	const socket = useRef();
	const socketIsConfigured = useRef(false);

	const [messages, setMessages] = useState([]);

	const handleSendMessage = async (message) => {
		const { _id: currentChatId } = currentChat;
		const { _id: userId } = user;
		// TODO: Something better than a early return...
		if (!userId || !currentChatId) return;
		try {
			const { data, status } = await postMessage({
				sendTo: currentChatId,
				from: userId,
				message,
			});

			if (status === 201 && data?.success) {
				const { msg: newMessage } = data;
				socket.current.emit(chatEvents.send, {
					to: currentChatId,
					from: userId,
					id: newMessage.id,
					message,
				});
				setMessages((prevMessages) => [...prevMessages, newMessage]);
			}
		} catch (error) {
			console.log("Error sending new message: ", error);
		}
	};

	const handleIncomingSocketMessages = ({ message, id }) => {
		const incomingMsg = { fromSelf: false, message, id };
		setMessages((prevMessages) => [...prevMessages, incomingMsg]);
	};

	useEffect(() => {
		if (!socketIsConfigured.current) {
			socket.current = io(routes.host);
			socket.current.emit(chatEvents.addUser, user._id);
			socket.current.on(chatEvents.received, handleIncomingSocketMessages);
			socketIsConfigured.current = true;
		}
	}, []);

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const { data, status } = await fetchMessages({
					sentTo: currentChat._id,
					from: user._id,
				});

				if (status === 200 && data?.success) {
					setMessages(data.messages);
				}
			} catch (error) {
				console.log("Error fetching messages: ", error);
			}
		};

		if (user?._id && currentChat?._id) {
			handleGetMessages();
		}
	}, [currentChat]);

	return (
		<Container>
			<Header>
				<UserCard>
					<div className="avatar">
						<img
							src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
							alt="user-avatar"
						/>
					</div>
					<TitleWrapper>
						<h3>{currentChat.username}</h3>
					</TitleWrapper>
				</UserCard>
				<Logout
					user={user}
					currentChat={currentChat}
				/>
			</Header>
			<ChatMessages messages={messages} />
			<ChatInput handleSendMsg={handleSendMessage} />
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 80% 10%;
	gap: 0.1rem;
	overflow: hidden;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		grid-template-rows: 15% 70% 15%;
	}
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
`;

const UserCard = styled(AvatarContainer)`
	display: flex;
	align-items: center;
	gap: 1rem;
`;
