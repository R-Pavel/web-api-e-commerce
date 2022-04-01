const expressJWT = require('express-jwt')

function authJwt() {
	const SECRET_JWT = process.env.SECRET_JWT

	return expressJWT({
		SECRET_JWT,
		algorithms: ['HS256']
	})
}

module.exports = authJwt;