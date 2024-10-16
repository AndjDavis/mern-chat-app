import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useIsAuthenticated } from "../hooks";
import { paths } from "../constants";

const ProtectedRoute = () => {
	const { isAuthenticated } = useIsAuthenticated();

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
