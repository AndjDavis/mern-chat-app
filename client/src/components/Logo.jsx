import styled from "styled-components";
import LogoImg from "../../assets/logo.svg";

export default function Logo({ height = "5rem" }) {
	return (
		<Container>
			<Image
				height={height}
				src={LogoImg}
				alt="logo"
			/>
			<h1>snappy</h1>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 1rem;
	h1 {
		color: white;
		text-transform: uppercase;
	}
`;

const Image = styled.img.attrs((props) => ({
	src: props.src,
	alt: props.alt,
	height: props.height || "5rem",
}))`
	height: ${(props) => props.height};
`;
