import React, { useState } from "react";
import styled from "styled-components";

import Logo from "./Logo";
import { TitleWrapper, AvatarContainer } from "../styles/styles";

export default function Contacts({ contacts, changeChat, user }) {
	const [currentSelectedIndex, setCurrentSelectedIndex] = useState(undefined);
	const changeCurrentChat = (index, contact) => {
		setCurrentSelectedIndex(index);
		changeChat(contact);
	};

	return (
		<>
			{user?.avatarImage && user?.username && (
				<Container>
					<Logo height="2rem" />
					<ContactList
						contacts={contacts}
						currentSelectedIndex={currentSelectedIndex}
						onClick={changeCurrentChat}
					/>
					<UserCard>
						<div className="avatar">
							<img
								src={`data:image/svg+xml;base64,${user.avatarImage}`}
								alt="avatar"
							/>
						</div>
						<UserTitleWrapper>
							<h2>{user.username}</h2>
						</UserTitleWrapper>
					</UserCard>
				</Container>
			)}
		</>
	);
}

const ContactList = ({ contacts, currentSelectedIndex, onClick }) => {
	return (
		<ListContainer>
			{contacts.map((contact, index) => (
				<ContactDetail
					contact={contact}
					index={index}
					currentSelectedIndex={currentSelectedIndex}
					onClick={onClick}
				/>
			))}
		</ListContainer>
	);
};

const ContactDetail = ({ contact, currentSelectedIndex, onClick, index }) => {
	return (
		<ContactCard
			key={contact._id}
			className={index === currentSelectedIndex ? "selected" : ""}
			onClick={() => onClick(index, contact)}
		>
			<div className="avatar">
				<img
					src={`data:image/svg+xml;base64,${contact.avatarImage}`}
					alt=""
				/>
			</div>
			<div className="username">
				<h3>{contact.username}</h3>
			</div>
		</ContactCard>
	);
};

const ContactCard = styled.div`
	background-color: #ffffff34;
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
