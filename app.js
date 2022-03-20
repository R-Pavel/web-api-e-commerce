require('dotenv/config');

const express = require('express');
const app = express();
const api_url = process.env.API_URL
const bodyParser = require('body-parser');


//middleware
app.use(bodyParser.json())

app.get(`${api_url}/products`,(req, res) => {
	const product = {
		id:1,
		name: "good1",
		desc: 'good1 very good',
		image: 'some_url_pic', 
		price: "100",

	};
	res.send(product);
})

app.post(`${api_url}/products`,(req, res) => {

	const newProduct = req.body;
	console.log(newProduct);
	res.send(newProduct);
})

app.listen(3000, ()=> {
	console.log('Server Up');
})