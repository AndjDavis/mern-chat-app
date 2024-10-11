import React from "react";
import styled from "styled-components";

import Logout from "../../../components/Logout";
import RobotImage from "../../../components/RobotImage";
import { FlexBox } from "../../../styles/styles";

export default function Welcome({ user }) {
	const username = user?.username || "User";

	return (
		<Container>
			<div className="logout">
				<Logout user={user} />
			</div>
			<RobotImage />
			<h1>
				Welcome, <span>{username}!</span>
			</h1>
			<h3>Please select a chat to Start messaging.</h3>
		</Container>
	);
}

const Container = styled(FlexBox)`
	color: white;
	img {
		height: 20rem;
		flex-grow: 8;
	}
	span {
		color: #4e0eff;
		flex-grow: 8;
	}
	h3 {
		margin-top: 1rem;
		flex-grow: 8;
	}
	.logout {
		display: flex;
		flex-grow: 1;
		width: 100%;
		justify-content: flex-end;
		align-items: center;
		padding-right: 0.5rem;
	}
`;
