import axios from "axios";

import routes from "../utils/routes";
import { handleBadResponse } from "./helpers";

export const getContacts = async (userId) => {
	try {
		return await axios.get(`${routes.contactsRoute}/${userId}`);
	} catch (error) {
        console.log("Get Contacts Error:", error);
		handleBadResponse(error);
	}
};
