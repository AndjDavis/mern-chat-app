import React, { useEffect, useRef } from "react";
import styled from "styled-components";

// TODO: Figure out key
export default function ChatMessages({ messages = [] }) {
	const scrollRef = useRef();
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<Container>
			{messages.map((message, index) => (
				<Message
					message={message}
					key={index}
					scrollRef={scrollRef}
				/>
			))}
		</Container>
	);
}

const Message = ({ message, scrollRef }) => {
	return (
		<div ref={scrollRef}>
			<MessageCard className={message.fromSelf ? "sent" : "recieved"}>
				<CardDetail>
					<p>{message.message}</p>
				</CardDetail>
			</MessageCard>
		</div>
	);
};

export const Container = styled.div`
	padding: 1rem 2rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: auto;
	&::-webkit-scrollbar {
		width: 0.2rem;
		&-thumb {
			background-color: #ffffff39;
			width: 0.1rem;
			border-radius: 1rem;
		}
	}
`;

const MessageCard = styled.div`
	display: flex;
	align-items: center;

	&.sent {
		justify-content: flex-end;
		div {
			background-color: #4f04ff21;
		}
	}

	&.recieved {
		justify-content: flex-start;
		div {
			background-color: #9900ff20;
		}
	}
`;

const CardDetail = styled.div`
	max-width: 40%;
	overflow-wrap: break-word;
	padding: 1rem;
	font-size: 1.1rem;
	border-radius: 1rem;
	color: #d1d1d1;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		max-width: 70%;
	}
`;
