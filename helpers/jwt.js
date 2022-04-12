const expressJWT = require('express-jwt')

function authJwt() {
	const secret = process.env.SECRET_JWT
	const api = process.env.API_URL
	return expressJWT({
		secret: process.env.SECRET_JWT,
		algorithms: ['HS256']
	}).unless({
		path: [
			{url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
			{url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
			{url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS']},
			`${api}/users/login`,
			`${api}/users/register`,
		]
	})
}

module.exports = authJwt();