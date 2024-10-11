import React from "react";
import styled from "styled-components";
import robot from "../assets/robot.gif";

export default function RobotImage({ flexGrow = null }) {
	return (
		<Image
			src={robot}
			$flexGrow={flexGrow}
		/>
	);
}

const Image = styled.img.attrs((props) => ({
	$flexGrow: props.flexGrow || 8,
}))`
	height: 20rem;
	flex-grow: ${({ $flexGrow }) => $flexGrow};
`;
