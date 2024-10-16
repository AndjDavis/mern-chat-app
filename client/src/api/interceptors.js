import client from "./client";
import { errorHandler } from "./errorHandler";

export const setupAxiosInterceptors = (accessToken, onUnauthorized) => {
	// Set up request interceptor
	const requestInterceptor = client.interceptors.request.use((config) => {
		if (accessToken) {
			config.headers.authorization = `Bearer ${accessToken}`;
		}
		return config;
	});

	// Set up response interceptor
	const responseInterceptor = client.interceptors.response.use(
		(response) => response,
		(error) => {
			if (error.response && error.response.status === 401) {
				onUnauthorized(); // Custom behavior when the user is unauthorized
			}
			return Promise.reject(errorHandler.handle(error));
		}
	);

	// Return eject functions to clean up interceptors when needed
	return () => {
		client.interceptors.request.eject(requestInterceptor);
		client.interceptors.response.eject(responseInterceptor);
	};
};
