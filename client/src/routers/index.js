import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Register from "../pages/Register";
import Login from "../pages/Login";
import ChatRoom from "../pages/ChatRoom";
import Profile from "../pages/Profile";
import ProtectedRoute from "./ProtectedRoute";

import { paths } from "../constants";

// TODO: Create error page....
const router = createBrowserRouter([
	{
		path: paths.LOGIN,
		element: <Login />,
		index: true,
	},
	{
		path: paths.REGISTER,
		element: <Register />,
		index: true,
	},
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: paths.CHATROOM,
				element: <ChatRoom />,
			},
			{
				path: paths.PROFILE,
				element: <Profile />,
			},
		],
	},
	{
		path: "*",
		element: <p>404 Error - Nothing here...</p>,
	},
]);

export default router;
