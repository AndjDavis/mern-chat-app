const { decode, sign, verify } = require("jsonwebtoken");
const { decrypt, encrypt } = require("./encryption");
const config = require("../config/authConfig");

const TokenType = {
	ACCESS_TOKEN: "access_token",
	REFRESH_TOKEN: "refresh_token",
};

const generateToken = (userId, type) => {
	const audience = config.get("authentication.token.audience");
	const issuer = config.get("authentication.token.issuer");
	const secret = config.get("authentication.token.secret");
	const expiresIn =
		type === TokenType.ACCESS_TOKEN
			? config.get("authentication.token.expiresIn")
			: config.get("authentication.refreshToken.expiresIn");

	const token = sign({ type }, secret, {
		expiresIn,
		audience: audience,
		issuer: issuer,
		subject: userId,
	});

	return {
		token: encrypt(token),
		expiration: decode(token).exp * 1000,
	};
};

const generateAccessToken = (userId) => {
	return generateToken(userId, TokenType.ACCESS_TOKEN);
};

const generateRefreshToken = (userId) => {
	return generateToken(userId, TokenType.REFRESH_TOKEN);
};

const getTokenType = (token) => {
	return verify(token, config.get("authentication.token.secret")).type;
};

const parseTokenAndGetUserId = (token) => {
	const decryptedToken = decrypt(token);
	const decoded = verify(
		decryptedToken,
		config.get("authentication.token.secret")
	);
	return decoded.sub || "";
};

module.exports = {
	generateAccessToken,
	generateRefreshToken,
	generateToken,
	getTokenType,
	parseTokenAndGetUserId,
	TokenType,
};
