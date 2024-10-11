import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserProvider from "./context/UserProvider";

export default function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route
						path="/register"
						element={<Register />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/profile"
						element={<Profile />}
					/>
					<Route
						path="/"
						element={<Home />}
					/>
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}
