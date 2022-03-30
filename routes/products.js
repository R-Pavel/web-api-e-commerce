
const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const { send } = require('express/lib/response');
const router = express.Router()
const mongoose = require('mongoose')

router.get(`/`, async (req, res) => {
	let filter = {}
	if (req.query.categories){
		filter = {category:req.query.categories.split(',')}
	}
	const productList = await Product.find(filter).populate('category');
	if(!productList){
		res.status(500).json({success:false})
	}
	res.send(productList);
})
//  ?categories=623c88046bd302a161b15954,623c87de29766d0f4f6c0f3e
router.get(`/:id`, async (req, res) => {
	const product = await Product.findById(req.params.id).populate('category');
	if(!product){
		res.status(500).json({success:false})
	}
	res.send(product);
})

router.post(`/`, async(req, res) => {
	const category = await Category.findById(req.body.category)
	if(!category){
		return res.status(400).send('Invalid category')
	}
	let product = new Product({
		name: req.body.name,
		description: req.body.description,
		richDescription: req.body.richDescription,
		image: req.body.image,
		brand: req.body.brand,
		price: req.body.price,
		category: category,
		countInStock: req.body.countInStock,
		rating: req.body.rating,
		numReviews: req.body.numReviews,
		isFeatured: req.body.isFeatured,
	})

	product = await product.save()
	if(!product){
		return res.status(500).send('The product cannot be created')
	}

	return res.send(product)
})

router.put('/:id', async (req, res) => {
	if(!mongoose.isValidObjectId(req.params.id)){
		return res.status(400).send('Invalid product ID')
	}
	const category = await Category.findById(req.body.category)
	if(!category){
		return res.status(400).send('Invalid category')
	}
	const product = await Product.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			description: req.body.description,
			richDescription: req.body.richDescription,
			image: req.body.image,
			brand: req.body.brand,
			price: req.body.price,
			category: category,
			countInStock: req.body.countInStock,
			rating: req.body.rating,
			numReviews: req.body.numReviews,
			isFeatured: req.body.isFeatured,
		},
		{
			new: true
		}).populate('category')
	if(!product){
		res.status(500).json({success:false, message: 'not found product'})
	}
	res.status(200).json(product)
})

router.delete('/:id', (req,res) => {
	if(!mongoose.isValidObjectId(req.params.id)){
		return res.status(400).send('Invalid product ID')
	} 
	Product.findByIdAndRemove(req.params.id).then(product => {
		if(product){
			res.status(200).json({
				success: true,
				message: "Product has deleted"
			})
		} else {
			res.status(500).json({
				success: false,
				message: "Product not found"
			})
		}
	}).catch(err => res.status(400).json({
		error: err,
		success: false
	}))
})

router.get(`/get/count`, async (req, res) => {
	const productCount = await Product.countDocuments((count) => count)
	if(!productCount){
		res.status(500).json({success:false})
	}
	res.send({
		productCount:productCount
	});
})

router.get(`/get/featured/:count`, async (req, res) => {
	const count = req.params.count ? req.params.count : 0
	const products = await Product.find({isFeatured: false}).limit(+count)
	if(!products || products.length === 0){
		res.status(500).json({success:false})
	}
	res.send(products);
})

module.exports = router;