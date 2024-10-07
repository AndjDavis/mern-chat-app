import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfLoggedIn = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
			navigate("/");
		}
	}, [navigate]);
};

export default useRedirectIfLoggedIn;
