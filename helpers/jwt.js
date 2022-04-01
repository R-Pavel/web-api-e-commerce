const expressJWT = require('express-jwt')

function authJwt() {
	return expressJWT({
		secret: process.env.SECRET_JWT,
		algorithms: ['HS256']
	})
}

module.exports = authJwt();