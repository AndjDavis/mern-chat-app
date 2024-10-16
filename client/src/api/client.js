import axios from "axios";
import routes from "../constants/routes";

const axiosConfig = {
	baseURL: routes.host,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
}

const client = axios.create(axiosConfig);

// Interceptor for handling responses

// You can create request interceptors for attaching tokens or similar logic
// apiClient.interceptors.request.use(handleAttachToken, handlePromisReject);

export default client;