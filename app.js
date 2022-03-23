require('dotenv/config');

const express = require('express');
const app = express();
const api_url = process.env.API_URL
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const userDB = 'eshop-user';
const pass = 'bYji73E8';



//middleware
app.use(bodyParser.json())
app.use(morgan('tiny'))


const productSchema = mongoose.Schema({
    name: String,
    image: String,
	countInStock: {
		type: Number,
		required: true
	}
});

const Product = mongoose.model('Product', productSchema)

app.get(`${api_url}/products`, async (req, res) => {
	const productList = await Product.find();
	if(!productList){
		res.status(500).json({success:false})
	}
	res.send(productList);
})

app.post(`${api_url}/products`,(req, res) => {
	const product = new Product({
		name: req.body.name,
		image: req.body.image,
		countInStock: req.body.countInStock
	})

	product.save().then((createdProduct => {
		res.status(201).json(createdProduct)
	})).catch((err) => {
		res.status(500).json({
			error:err, 
			success: false
		})
	})
})

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
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