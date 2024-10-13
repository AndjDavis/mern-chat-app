import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AvatarList from "./components/AvatarList";
import Loader from "../../components/Loader";
import Logout from "../../components/Logout";
import ChatRoomButton from "../../components/ChatRoomButton";

import { setLocalStorageItem, getLocalStorageItem } from "../../utils";
import { Container, Button, FlexBox, TitleWrapper } from "../../styles/styles";
import { toastOptions, paths } from "../../constants";
import { getRandomMultiAvatars } from "../../api/services/avatarService";
import { useUser } from "../../hooks";

const AVATAR_STORAGE_KEY = process.env.REACT_APP_STORAGE_AVATARS_KEY;

export default function Profile() {
	const navigate = useNavigate();
	const hasFetched = useRef(false);
	const { updateUser } = useUser();

	const [avatars, setAvatars] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(undefined);

	const setProfilePicture = async () => {
		if (selectedAvatarIndex === undefined) {
			toast.error("Please select an avatar...", toastOptions);
			return;
		}

		const selectedAvatar = avatars[selectedAvatarIndex];
		if (!selectedAvatar) {
			toast.error("Something went wrong in the avatar selection", toastOptions);
			return;
		}

		try {
			await updateUser({ avatarImage: selectedAvatar });
			navigate(paths.CHAT);
		} catch (error) {
			console.log("Error while updating user avatar image: ", error.message);
			const message = error?.message || "Please try again later.";
			toast.error(
				`An error occurred while updating your avatar... ${message}`,
				toastOptions
			);
		}
	};

	const fetchAvatars = async () => {
		try {
			const avatars = await getRandomMultiAvatars();
			setAvatars(avatars);
			setLocalStorageItem(avatars, AVATAR_STORAGE_KEY);
		} catch (error) {
			console.log("Fetching avatars error: ", error);
			const message = error?.message || "Please try again later.";
			toast.error(
				`An error occurred while getting avatars... ${message}`,
				toastOptions
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (hasFetched.current) {
			return;
		}

		const loadAvatars = async () => {
			setIsLoading(true);
			const cachedAvatars = getLocalStorageItem(AVATAR_STORAGE_KEY);
			if (cachedAvatars) {
				setAvatars(cachedAvatars);
				setIsLoading(false);
				return;
			}

			await fetchAvatars();
		};

		loadAvatars();
		hasFetched.current = true;
	}, []);

	if (isLoading) {
		return (
			<Container>
				<Loader />
			</Container>
		);
	}

	return (
		<>
			<ProfileContainer>
				<LogoutWrapper>
					<ChatRoomButton />
					<Logout />
				</LogoutWrapper>
				<Content>
					<TitleWrapper>
						<h1>Pick an Avatar as your profile picture</h1>
					</TitleWrapper>
					<AvatarList
						avatarList={avatars}
						selectedAvatarIndex={selectedAvatarIndex}
						onClick={setSelectedAvatarIndex}
					/>
					<Button onClick={setProfilePicture}>Set as Profile Picture</Button>
					<RefreshButton onClick={fetchAvatars}>
						<BiRefresh />
					</RefreshButton>
				</Content>
			</ProfileContainer>
			<ToastContainer />
		</>
	);
}

const ProfileContainer = styled(Container)`
	justify-content: space-around;
`;

const Content = styled(FlexBox)`
	flex-grow: 9;
	justify-content: space-evenly;
	width: 50%;
`;

const LogoutWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	width: 90%;
	gap: 0.5rem;
`;

const RefreshButton = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
	border-radius: 0.5rem;
	background-color: #9a86f3;
	border: none;
	cursor: pointer;
	svg {
		font-size: 1.3rem;
		color: #ebe7ff;
	}
`;
