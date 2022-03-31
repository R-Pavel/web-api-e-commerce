const {User} = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.get(`/`, async (req, res) => {
	const userList = await User.find().select('-passwordHash')

	if(!userList) {
		res.status(500).json({success: false})
	}
	res.send(userList)
})

router.get(`/:id`, async (req,res) => {
	const user = await User.findById(req.params.id).select('-passwordHash')
	if(!user) {
		res.status(500).json({message: 'No user with this ID'})
	}
	res.status(200).send(user)
})

router.post(`/`, async (req, res) => {
	let user = new User({
		name: req.body.name,
		apartment: req.body.apartment,
		email: req.body.email,
		zip: req.body.zip,
		passwordHash: bcrypt.hashSync(req.body.password, 10),
		street: req.body.street,
		city: req.body.city,
		country: req.body.country,
		phone: req.body.phone,
		isAdmin: req.body.isAdmin
	})
	user = await user.save()
	if(!user){
		return res.status(400).send('the user cannot be created')
	}
	res.send(user)
})

router.put('/:id', async (req, res) => {
	const user = await User.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			apartment: req.body.apartment,
			email: req.body.email,
			zip: req.body.zip,
			passwordHash: bcrypt.hashSync(req.body.password, 10),
			street: req.body.street,
			city: req.body.city,
			country: req.body.country,
			phone: req.body.phone,
			isAdmin: req.body.isAdmin
		},
		{
			new: true
		}
	)
	if(!user) {
		res.status(500).json({message: 'No user with this ID'})
	}
	res.status(200).send(user)
})

router.delete('/:id', (req, res) => {
	User.findByIdAndRemove(req.params.id).then(user => {
		if(user) {
			return res.status(200).json({
				success: true,
				message: 'User has deleted'
			});
		} else {
			return res.status(404).json({
				success: false,
				message: 'User not found'
			})
		}
	}).catch(err => {
		res.status(400).json({
			success: false,
			error: err
		})
	})
})

module.exports = router 