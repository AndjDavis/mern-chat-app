import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "../../../components/Logout";

import {
	fetchMessages,
	postMessage,
} from "../../../api/services/messageService";
import { TitleWrapper, AvatarContainer } from "../../../styles/styles";
import { formatChatMessage } from "../../../utils";
import { chatEvents } from "../../../constants";
import routes from "../../../constants/routes";

export default function ChatContainer({ chatRecipient, user }) {
	const socket = useRef();
	const socketIsConfigured = useRef(false);

	const [messages, setMessages] = useState([]);

	const handleSendMessage = async (message) => {
		const { _id: recipientId } = chatRecipient;
		const { _id: userId } = user;

		// TODO: Something better than a early return...
		if (!userId || !recipientId) return;
		try {
			const { msg: newMsg } = await postMessage({
				recipientId: recipientId,
				authorId: userId,
				message,
			});

			socket.current.emit(chatEvents.send, {
				to: recipientId,
				from: userId,
				id: newMsg.id,
				message,
			});
			setMessages((prevMessages) => [...prevMessages, newMsg]);
		} catch (error) {
			console.log("Error sending new message: ", error);
		}
	};

	const handleIncomingSocketMessages = ({ message, id: _id, author }) => {
		const chatMsg = formatChatMessage({ message, _id, author }, user._id);
		setMessages((prevMessages) => [...prevMessages, chatMsg]);
	};

	useEffect(() => {
		if (!socketIsConfigured.current && user?._id) {
			socket.current = io(routes.host);
			socket.current.emit(chatEvents.addUser, user._id);
			socket.current.on(chatEvents.received, handleIncomingSocketMessages);
			socketIsConfigured.current = true;
		}
	}, [user]);

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const { messages } = await fetchMessages({
					recipientId: chatRecipient._id,
					authorId: user._id,
				});

				setMessages(messages);
			} catch (error) {
				console.log("Error fetching messages: ", error);
			}
		};

		if (chatRecipient?._id && user?._id) {
			handleGetMessages();
		}
	}, [chatRecipient, user]);

	return (
		<Container>
			<Header>
				<UserCard>
					<div className="avatar">
						<img
							src={`data:image/svg+xml;base64,${chatRecipient.avatarImage}`}
							alt="user-avatar"
						/>
					</div>
					<TitleWrapper>
						<h3>{chatRecipient.username}</h3>
					</TitleWrapper>
				</UserCard>
				<Logout />
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
