import styled from "styled-components";

export default function AvatarList({
	avatarList,
	selectedAvatarIndex,
	onClick,
}) {
	const listOfAvatars = Array.isArray(avatarList) ? avatarList : [];
	return (
		<Avatars>
			{listOfAvatars.map((avatar, index) => (
				<div
					key={index}
					className={`avatar ${
						selectedAvatarIndex === index ? "selected" : ""
					}`}
				>
					<img
						src={`data:image/svg+xml;base64,${avatar}`}
						alt="avatar"
						key={avatar}
						onClick={() => onClick(index)}
					/>
				</div>
			))}
		</Avatars>
	);
}

const Avatars = styled.div`
	display: flex;
	gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`;
