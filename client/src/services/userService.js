import axios from "axios";

import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";

export const getAllUsers = async (userId) => {
	try {
		const response = await axios.get(`${routes.allUsersRoute}/${userId}`);
		return response;
	} catch (error) {
        console.log("Get All Users Error:", error);
		handleBadResponse(error);
	}
};
