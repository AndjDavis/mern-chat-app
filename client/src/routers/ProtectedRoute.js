import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { paths } from "../constants";

const ProtectedRoute = () => {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		return (
			<Navigate
				to={paths.LOGIN}
				replace
			/>
		);
	}

	return <Outlet />;
};

export default ProtectedRoute;
