require('dotenv/config');

const express = require('express');
const app = express();
const api_url = process.env.API_URL
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')
const authJwt = require('./helpers/jwt')
const errorHandler = require('./helpers/error-handler')

app.use(cors())
app.options('*', cors())


//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(authJwt)

//Routes
const categoriesRoutes = require('./routes/categories')
const productsRoutes = require('./routes/products')
const usersRoutes = require('./routes/users')
const ordersRoutes = require('./routes/orders');
const res = require('express/lib/response');


app.use(`${api_url}/categories`, categoriesRoutes)
app.use(`${api_url}/products`, productsRoutes)
app.use(`${api_url}/users`, usersRoutes)
app.use(`${api_url}/orders`, ordersRoutes)
app.use(errorHandler)

//Database
mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	dbName: 'eshop-database'
})
.then(() => {
	console.log("Connection with database is ready")
})
.catch((error) => {
	console.log(error)
})

app.listen(3000, ()=> {
	console.log('Server Up');
})