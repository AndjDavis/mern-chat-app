import axios from "axios";
import routes from "../constants/routes";
import { errorHandler } from "./interceptors";

const client = axios.create({
	baseURL: routes.host,
	headers: {
		"Content-Type": "application/json",
	},
});

// Interceptor for handling responses
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors centrally
    return Promise.reject(errorHandler.handle(error));
  }
);

// You can create request interceptors for attaching tokens or similar logic
// apiClient.interceptors.request.use(handleAttachToken, handlePromisReject);

export default client;