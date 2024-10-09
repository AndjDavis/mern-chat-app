import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styled from "styled-components";

import { Form } from "../styles/styles";

export default function ChatInput({ handleSendMsg }) {
	const [msg, setMsg] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);

	const handleEmojiPickerhideShow = () => {
		setShowEmojiPicker((prevState) => !prevState);
	};

	const handleEmojiClick = (_, emojiObject) => {
		setMsg((prevMsg) => (prevMsg += emojiObject.emoji));
	};

	const sendChat = (event) => {
		event.preventDefault();
		if (msg) {
			handleSendMsg(msg);
			setMsg("");
		}
	};

	return (
		<Container>
			<EmojiContainer>
				<div className="emoji">
					<BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
					{showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
				</div>
			</EmojiContainer>
			<MessageForm onSubmit={sendChat}>
				<Input
					type="text"
					required
					placeholder="Type your message here"
					name="message"
					onChange={(e) => setMsg(e.target.value)}
					value={msg}
				/>
				<IconButton type="submit">
					<IoMdSend />
				</IconButton>
			</MessageForm>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 5% 95%;
	background-color: #080420;
	padding: 0 2rem;
	padding-bottom: 2rem;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		padding: 0 1rem;
		gap: 1rem;
	}
`;

const EmojiContainer = styled.div`
	display: flex;
	align-items: center;
	color: white;
	gap: 1rem;
	.emoji {
		position: relative;
		svg {
			font-size: 1.5rem;
			color: #ffff00c8;
			cursor: pointer;
		}
		.emoji-picker-react {
			position: absolute;
			top: -350px;
			background-color: #080420;
			box-shadow: 0 5px 10px #9a86f3;
			border-color: #9a86f3;
			.emoji-scroll-wrapper::-webkit-scrollbar {
				background-color: #080420;
				width: 5px;
				&-thumb {
					background-color: #9a86f3;
				}
			}
			.emoji-categories {
				button {
					filter: contrast(0);
				}
			}
			.emoji-search {
				background-color: transparent;
				border-color: #9a86f3;
			}
			.emoji-group:before {
				background-color: #080420;
			}
		}
	}
`;

const MessageForm = styled(Form)`
	flex-direction: row;
	align-items: center;
	width: 100%;
	background-color: #ffffff34;
	padding: 0;
`;

const Input = styled.input`
	width: 90%;
	height: 60%;
	background-color: transparent;
	color: white;
	border: none;
	padding-left: 1rem;
	font-size: 1.2rem;

	&::selection {
		background-color: #9a86f3;
	}

	&:focus {
		outline: none;
	}
`;

const IconButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.3rem 2rem;
	border-radius: 2rem;
	background-color: #9a86f3;
	border: none;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		padding: 0.3rem 1rem;
		svg {
			font-size: 1rem;
		}
	}
	svg {
		font-size: 2rem;
		color: white;
	}
`;
