import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfNotLoggedIn = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
			navigate("/login");
		}
	}, [navigate]);
};

export default useRedirectIfNotLoggedIn;
