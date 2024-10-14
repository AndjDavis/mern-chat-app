import styled from "styled-components";

import Logout from "../../../components/Logout";
import ProfileButton from "../../../components/ProfileButton";
import Welcome from "./Welcome";
import ChatContainer from "./ChatContainer";

export default function ChatRoom({ chatRecipient }) {
	return (
		<Container>
			<div className="header">
				<ProfileButton />
				<Logout />
			</div>
			{chatRecipient ? (
				<ChatContainer chatRecipient={chatRecipient} />
			) : (
				<Welcome />
			)}
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	grid-template-rows: 10% 90%;
	gap: 0.1rem;
	overflow: hidden;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		grid-template-rows: 10% 90%;
	}
	.header {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 0.5rem;
		gap: 0.5rem;
	}
`;
