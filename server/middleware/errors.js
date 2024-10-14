const serverErrorResponse = (err, req, res, next) => {
	console.error(`Server error on ${req.originalUrl}: ${err.stack}`); // Log the error stack
	res.status(500).json({
		message: "Server error. Please try again later.",
		success: false,
	});
};

module.exports = {
	serverErrorResponse,
};
