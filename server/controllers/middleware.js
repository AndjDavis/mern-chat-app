const serverErrorResponse = (res, error, route, statusCode=500) => {
	console.log(`Server error on ${route}: ${error}`);
	return res.status(statusCode).json({
		message: "Server error. Please try again later.",
		success: false,
	});
};

module.exports = {
	serverErrorResponse,
};
