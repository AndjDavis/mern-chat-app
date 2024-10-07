import styled from "styled-components";
import Logo from "../assets/logo.svg";

const StyledLogo = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	justify-content: center;

	img {
		height: 5rem;
	}

	h1 {
		color: white;
		text-transform: uppercase;
	}
`;

const FormLogo = () => {
	return (
		<StyledLogo className="brand">
			<img
				src={Logo}
				alt="logo"
			/>
			<h1>snappy</h1>
		</StyledLogo>
	);
};

export default FormLogo;
