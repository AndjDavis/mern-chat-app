import styled from "styled-components";

const StyledContainer = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 1rem;
	align-items: center;
	background-color: #131324;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	background-color: #00000076;
	border-radius: 2rem;
	padding: 5rem;
`;

const StyledInput = styled.input`
	background-color: transparent;
	padding: 1rem;
	border: 0.1rem solid #4e0eff;
	border-radius: 0.4rem;
	color: white;
	width: 100%;
	font-size: 1rem;
	&:focus {
		border: 0.1rem solid #997af0;
		outline: none;
	}
`;

const StyledSpan = styled.span`
	color: white;
	text-transform: uppercase;
	a {
		color: #4e0eff;
		text-decoration: none;
		font-weight: bold;
	}
`;

export { StyledContainer, StyledForm, StyledInput, StyledSpan };
