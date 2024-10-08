import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { toastOptions } from "../utils/constants";
import { Container, Button, Title } from "../styles/styles";
import AvatarList from "../components/AvatarList";
import Loader from "../components/Loader";
import useRedirectIfNotLoggedIn from "../hooks/useRedirectIfNotLoggedIn";
import { setProfileAvatar, fetchAvatarsList } from "../services/avatarService";

export default function Profile() {
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

		const user = await JSON.parse(
			localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
		);

		if (!user) {
			toast.error(
				"Couldn't find user information, please try again",
				toastOptions
			);
			return;
		}

		const selectedAvatar = avatars[selectedAvatarIndex];
		if (!selectedAvatar) {
			toast.error("Something went wrong in the avatar selection", toastOptions);
			return;
		}

		try {
			const { data } = await setProfileAvatar(selectedAvatar, user._id);
			if (data?.success && data?.isSet) {
				user.avatarImage = data.image;
				localStorage.setItem(
					process.env.REACT_APP_LOCALHOST_KEY,
					JSON.stringify(user)
				);
				navigate("/");
			} else {
				const message = data?.message
					? data.message
					: "Error setting avatar image to your profile. Please try again.";
				toast.error(message, toastOptions);
			}
		} catch (error) {
			console.log("Profile SetAvatar Error: ", error);
			toast.error(
				"An server error occurred while setting the avatar",
				toastOptions
			);
		}
	};

	const hasFetched = useRef(false);

	useEffect(() => {
		if (hasFetched.current) return;
		hasFetched.current = true;

		const fetchAvatarData = async () => {
			try {
				const data = await fetchAvatarsList();
				setAvatars(data);
			} catch (error) {
				console.log("Fetching Avatar Pictures Error: ", error);
				setAvatars([]);
			} finally {
				setIsLoading(false);
			}
		};
		setTimeout(() => fetchAvatarData(), 200);
	}, []);

	if (isLoading) {
		return (
			<Container>
				<Loader />
			</Container>
		);
	}
	return (
		<Container>
			<Title>
				<h1>Pick an Avatar as your profile picture</h1>
			</Title>
			<AvatarList
				avatarList={avatars}
				selectedAvatarIndex={selectedAvatarIndex}
				onClick={setSelectedAvatarIndex}
			/>
			<Button onClick={setProfilePicture}>
				Set as Profile Picture
			</Button>
			<ToastContainer />
		</Container>
	);
}
