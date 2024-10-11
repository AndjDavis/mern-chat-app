import styled from "styled-components";

export default function AvatarImage({ src, alt, height, maxis }) {
	return (
		<ImageContainer
			$height={height}
			$maxis={maxis}
		>
			<img
				className="avatar"
				src={`data:image/svg+xml;base64,${src}`}
				alt={alt || "avatar"}
			/>
		</ImageContainer>
	);
}

const ImageContainer = styled.div.attrs((props) => ({
	$height: props.$height || "3rem",
	$maxis: props.$maxis || "auto",
}))`
	.avatar {
		height: ${(props) => props.$height};
		max-inline-size: ${(props) => props.$maxis};
	}
`;
