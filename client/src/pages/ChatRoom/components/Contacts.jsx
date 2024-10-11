import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import Logo from "../../../components/Logo";
import AvatarImage from "../../../components/AvatarImage";

import { getUserContacts } from "../../../api/services/userService";
import { TitleWrapper, AvatarContainer } from "../../../styles/styles";
import { toastOptions } from "../../../constants";

export default function Contacts({ changeConversation, chatRecipient, user }) {
	const [contacts, setContacts] = useState([]);
	console.log("Contacts.user", user);

	// TODO: Cache avatar images to prevent too many api calls.
	// TODO: Add refresh button.
	useEffect(() => {
		const fetchContacts = async () => {
			let chatContacts = [];
			try {
				const { contacts } = await getUserContacts(user._id);
				chatContacts = contacts;
			} catch (error) {
				console.log("Fetching all contacts failed: ", error);
				toast.error(
					`Something went wrong while getting your contacts...`,
					toastOptions
				);
			} finally {
				setContacts(chatContacts);
			}
		};

		fetchContacts();
	}, []);

	return (
		<>
			{user?.avatarImage && (
				<Container>
					<Logo height="2rem" />
					<ContactList
						contacts={contacts}
						chatRecipient={chatRecipient}
						onClick={changeConversation}
					/>
					<UserCard
						height="4rem"
						$maxis="100%"
					>
						<div className="avatar">
							<img
								src={`data:image/svg+xml;base64,${user.avatarImage}`}
								alt="avatar"
							/>
						</div>
						<UserTitleWrapper>
							<h2>User: {user.username}</h2>
						</UserTitleWrapper>
					</UserCard>
				</Container>
			)}
		</>
	);
}

const ContactList = ({ contacts, chatRecipient, onClick }) => {
	return (
		<ListContainer>
			{contacts.map((contact) => (
				<ContactDetail
					key={contact._id}
					contact={contact}
					chatRecipient={chatRecipient}
					onClick={onClick}
				/>
			))}
		</ListContainer>
	);
};

const ContactDetail = ({ contact, chatRecipient, onClick }) => {
	const isActiveChatRecipient = chatRecipient?._id === contact._id;
	return (
		<ContactCard
			className={isActiveChatRecipient ? "selected" : ""}
			onClick={() => onClick(contact)}
		>
			<AvatarImage src={contact.avatarImage} />
			<TitleWrapper>
				<h3>{contact.username}</h3>
			</TitleWrapper>
		</ContactCard>
	);
};

const ContactCard = styled.div`
	display: flex;
	align-items: center;
	background-color: #ffffff34;
	width: 90%;
	min-height: 5rem;
	cursor: pointer;
	border-radius: 0.2rem;
	padding: 0.4rem;
	gap: 1rem;
	transition: 0.5s ease-in-out;

	&.selected {
		background-color: #9a86f3;
	}
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	gap: 0.8rem;
	&::-webkit-scrollbar {
		width: 0.2rem;
		&-thumb {
			background-color: #ffffff39;
			width: 0.1rem;
			border-radius: 1rem;
		}
	}
`;

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 75% 15%;
	overflow: hidden;
	background-color: #080420;
`;

const UserCard = styled(AvatarContainer)`
	border: solid 2px green;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #0d0d30;
	gap: 2rem;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		gap: 0.5rem;
	}
`;

const UserTitleWrapper = styled(TitleWrapper)`
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		h2 {
			font-size: 1rem;
		}
	}
`;
