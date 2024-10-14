const errorHandler = (err, req, res, next) => {
	console.error(`Server error on ${req.originalUrl}: ${err.stack}`); // Log the error stack
	const statusCode = res?.statusCode || 500;
	res.status(statusCode).json({
		message: err?.message || "Server error. Please try again later.",
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
		success: false,
	});
};

module.exports = {
	errorHandler,
};
