import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { TitleWrapper, AvatarContainer } from "../styles/styles";
import { getContacts } from "../services/userService";
import Logo from "./Logo";

// TODO: I'd like to switch currentSelectedIndex to a contact._id;
export default function Contacts({ changeChat, user }) {
	const [currentSelectedIndex, setCurrentSelectedIndex] = useState(undefined);
	const [contacts, setContacts] = useState([]);

	const changeCurrentChat = (index, contact) => {
		changeChat(contact);
		setCurrentSelectedIndex(index);
	};

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const { data, status } = await getContacts(user._id);
				if (status === 200 && data?.success) {
					setContacts(data.users);
				}
			} catch (error) {
				console.log("Fetching all contacts failed: ", error);
			}
		};

		if (user?._id) {
			fetchContacts();
		}
	}, [user]);

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
					key={contact._id}
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
			className={index === currentSelectedIndex ? "selected" : ""}
			onClick={() => onClick(index, contact)}
		>
			<div className="avatar">
				<img
					src={`data:image/svg+xml;base64,${contact.avatarImage}`}
					alt=""
				/>
			</div>
			<TitleWrapper>
				<h3>{contact.username}</h3>
			</TitleWrapper>
		</ContactCard>
	);
};

const ContactCard = styled(AvatarContainer)`
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
