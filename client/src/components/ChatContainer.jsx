import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import Logout from "./Logout";
import { fetchMessages, postMessage } from "../services/messageService";
import { TitleWrapper, AvatarContainer } from "../styles/styles";
import { socketChannels } from "../utils/constants";

export default function ChatContainer({ currentChat, user, socket }) {
	const [messages, setMessages] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);

	useEffect(() => {
		const handleGetMessages = async () => {
			try {
				const { data, status } = await fetchMessages({
					userId: user._id,
					chatId: currentChat._id,
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
	}, [user, currentChat]);

	const handleSendMessage = async (message) => {
		if (!user?._id || !currentChat?._id) return;
		try {
			socket.current.emit(socketChannels.send, {
				to: currentChat._id,
				from: user._id,
				message,
			});

			const { data, status } = await postMessage({
				userId: user._id,
				chatId: currentChat._id,
				message,
			});

			if (status === 201 && data?.success) {
				setMessages((prevMessages) => {
					const { msg } = data;
					return [...prevMessages, msg];
				});
			}
		} catch (error) {
			console.log("Error sending new message: ", error);
		}
	};

	useEffect(() => {
		if (socket?.current) {
			socket.current.on(socketChannels.received, (msg) => {
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, [socket]);

	useEffect(() => {
		arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

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
			<ChatMessages
				user={user}
				messages={messages}
			/>
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
