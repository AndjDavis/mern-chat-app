import React from "react";
import { RouterProvider } from "react-router-dom";

import UserProvider from "./context/UserProvider";
import router from "./routers";

export default function App() {
	return (
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	);
}

// export default function App() {
// 	return (
// 		<BrowserRouter>
// 			<UserProvider>
// 				<Routes>
// 					<Route
// 						path="/register"
// 						element={<Register />}
// 					/>
// 					<Route
// 						path="/login"
// 						element={<Login />}
// 					/>
// 					<Route
// 						path="/profile"
// 						element={<Profile />}
// 					/>
// 					<Route
// 						path="/"
// 						element={<Home />}
// 					/>
// 				</Routes>
// 			</UserProvider>
// 		</BrowserRouter>
// 	);
// }
