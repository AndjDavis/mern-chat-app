import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import Profile from "./pages/Profile/Profile";

import AuthContainer from "./providers/AuthContainer";
import ProtectedRoute from "./routers/ProtectedRoute";
import { paths } from "./constants";

export default function App() {
	return (
		<BrowserRouter>
			<AuthContainer.Provider>
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
							path={paths.CHAT}
							element={<Chat />}
						/>
					</Route>
				</Routes>
			</AuthContainer.Provider>
		</BrowserRouter>
	);
}
