import styled from "styled-components";

import loader from "../../assets/loader.gif";

export default function Loader() {
	return (
		<StyledImage
			src={loader}
			alt="loading spinner"
		/>
	);
}

const StyledImage = styled.img`
	max-inline-size: 100%;
`;
