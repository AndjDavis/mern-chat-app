import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AvatarList from "../components/AvatarList";
import Loader from "../components/Loader";
import Logout from "../components/Logout";

import { UserContext } from "../context/UserProvider";
import { Container, Button, FlexBox, TitleWrapper } from "../styles/styles";
import useRedirectIfNotLoggedIn from "../hooks/useRedirectIfNotLoggedIn";
import { toastOptions } from "../constants";
import { getRandomMultiAvatars } from "../api/services/avatarService";

export default function Profile() {
	const { updateUser } = useContext(UserContext);
	useRedirectIfNotLoggedIn();
	const navigate = useNavigate();

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
			navigate("/");
		} catch (error) {
			console.log("Error while updating user avatar image: ", error.message);
			const message = error?.message || "Please try again later.";
			toast.error(
				`An error occurred while updating your avatar... ${message}`,
				toastOptions
			);
		}
	};

	const hasFetched = useRef(false);

	useEffect(() => {
		const getAvatarSelection = async () => {
			let avatars = [];
			try {
				avatars = await getRandomMultiAvatars();
			} catch (error) {
				console.log("Fetching avatars error: ", error);
				const message = error?.message || "Please try again later.";
				toast.error(
					`An error occurred while getting avatars... ${message}`,
					toastOptions
				);
			} finally {
				setAvatars(avatars);
				setIsLoading(false);
			}
		};

		if (hasFetched.current || avatars.length) {
			return;
		} else {
			getAvatarSelection();
			hasFetched.current = true;
		}
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
			<WelcomeContainer>
				<LogoutWrapper>
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
				</Content>
			</WelcomeContainer>

			<ToastContainer />
		</>
	);
}

const WelcomeContainer = styled(Container)`
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
`;
