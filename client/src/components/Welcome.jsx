import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

import { FlexBox } from "../styles/styles";

export default function Welcome({ username = "" }) {
	return (
		<Container>
			<img
				src={Robot}
				alt="robot"
			/>
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
	}
	span {
		color: #4e0eff;
	}
	h3 {
		margin-top: 1rem;
	}
`;
