import styled from "styled-components";

export const AvatarContainer = styled.div.attrs((props) => ({
	height: props.height || "3rem",
	$maxis: props.$maxis || "auto",
}))`
	.avatar img {
		height: ${(props) => props.height};
		max-inline-size: ${(props) => props.$maxis};
	}
`;

export const FlexBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const Button = styled.button`
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

export const Card = styled.div`
	height: 85vh;
	width: 85vw;
	background-color: #00000076;
	display: grid;
	grid-template-columns: 25% 75%;
	@media screen and (min-width: 720px) and (max-width: 1080px) {
		grid-template-columns: 35% 65%;
	}
`;

export const Container = styled(FlexBox)`
	gap: 3rem;
	background-color: #131324;
	height: 100vh;
	width: 100vw;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 2rem;
`;

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	background-color: #00000076;
	border-radius: 2rem;
	padding: 5rem;
`;

export const Input = styled.input`
	width: 100%;
	background-color: transparent;
	padding: 1rem;
	border: 0.1rem solid #4e0eff;
	border-radius: 0.4rem;
	color: white;
	font-size: 1rem;
	&:focus {
		border: 0.1rem solid #997af0;
		outline: none;
	}
`;

export const Span = styled.span`
	color: white;
	text-transform: uppercase;
	a {
		color: #4e0eff;
		text-decoration: none;
		font-weight: bold;
	}
`;

export const TitleWrapper = styled.div`
	h1,
	h2,
	h3 {
		color: white;
	}
`;
