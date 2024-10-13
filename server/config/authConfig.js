module.exports = {
	get(key) {
		const envKey = key.toUpperCase().replace(/\./g, "_");
		return process.env[envKey];
	},
};
