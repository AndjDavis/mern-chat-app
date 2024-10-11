import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ChatRoom from "./pages/ChatRoom/ChatRoom";
import Profile from "./pages/Profile/Profile";

import UserProvider from "./context/UserProvider";
import ProtectedRoute from "./routers/ProtectedRoute";
import { paths } from "./constants";

export default function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route
						path={paths.LOGIN}
						element={<Login />}
					/>
					<Route
						path={paths.REGISTER}
						element={<Register />}
					/>
					<Route element={<ProtectedRoute />}>
						<Route
							path={paths.PROFILE}
							element={<Profile />}
						/>
						<Route
							path={paths.CHATROOM}
							element={<ChatRoom />}
						/>
					</Route>
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}
