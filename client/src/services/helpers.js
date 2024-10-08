export const handleBadResponse = (error) => {
	const errorResponse = {
		status: error?.status,
		data: {
			message: "An unexpected error occurred. Please try again later.",
			success: false,
		},
	};

	if (error?.response && error.response?.data) {
		errorResponse.data.message = error.response.data.message;
		errorResponse.data.success = error.response.data.success;
	}

	return errorResponse;
};
