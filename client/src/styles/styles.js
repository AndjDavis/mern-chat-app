import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 3rem;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
`;

export const SubmitButton = styled.button`
	background-color: #4e0eff;
	color: white;
	padding: 1rem 2rem;
	border: none;
	font-weight: bold;
	cursor: pointer;
	border-radius: 0.4rem;
	font-size: 1rem;
	text-transform: uppercase;
	&:hover {
		background-color: #4e0eff;
	}
`;

export const Title = styled.div`
	h1 {
		color: white;
	}
`;
