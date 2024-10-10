export class ErrorHandler {
	handle(error) {
		const url = error.config?.url || "URL not available";
		let message = "An unexpected error occurred. Please try again later.";
		let errorCode = "UNKNOWN_ERROR";

		if (error.response) {
			console.error(`API Error at ${url}:`, error.response.data);
			// Server responded with a status other than 200 range
			const { status, data } = error.response;
			// message = data.message || "Something went wrong";
			switch (status) {
				case 400:
					message = data.message || "Bad Request";
					errorCode = "BAD_REQUEST";
					break;
				case 401:
					message = data.message || "Invalid username or password";
					errorCode = "UNAUTHORIZED";
					break;
				case 404:
					message = data.message || "Resource not found";
					errorCode = "NOT_FOUND";
					break;
				case 409:
					message = data.message || "Resource already exists";
					errorCode = "NOT_FOUND";
					break;
				case 500:
					message = data.message || "Internal Server Error";
					errorCode = "INTERNAL_SERVER_ERROR";
					break;
				default:
					message = data.message || "Something went wrong";
					errorCode = "API_ERROR";
			}
		} else if (error.request) {
			console.error(`Network Error at ${url}:`, error.request);
			message = "Network error. Please try again.";
            errorCode = "NETWORK_ERROR";
		} else {
			// Something else caused the error
			console.error("Error:", error.message);
		}

		return {
			error: true,
			success: false,
			message,
			errorCode,
		};
	}
}

export const errorHandler = new ErrorHandler();
