const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { decrypt } = require("../utils/encryption");
const { getTokenType, TokenType } = require("../utils/token");
const config = require("../config/authConfig");
const User = require("../model/User");

const jwtExtractor = (req) => {
	try {
		if (!req.headers?.authorization) {
			throw new Error("Token was not provided, authorization header is empty");
		}

		const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
		const decryptedToken = decrypt(tokenFromHeader);
		const tokenType = getTokenType(decryptedToken);

		if (tokenType !== TokenType.ACCESS_TOKEN) {
			throw new Error("Wrong token type provided");
		}

		return decryptedToken;
	} catch (error) {
		console.error("Token is not valid", error.message);
		return null;
	}
};

const verifyRequest = (req, payload, done) => {
	User.findById(payload.sub, (err, user) => {
		if (err) {
			return done(err, false);
		}
		req.currentUser = user?.toJSON();
		return !user ? done(null, false) : done(null, user);
	});
};

const options = {};
options.jwtFromRequest = jwtExtractor;
options.secretOrKey = config.get("authentication.token.secret");
options.issuer = config.get("authentication.token.issuer");
options.audience = config.get("authentication.token.audience");
options.passReqToCallback = true;

passport.use(new JwtStrategy(options, verifyRequest));
