const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    image: String,
	age:Number,
	email: {
		type:String,
		required: false
	},
    passwordHash: String,
    street: String,
    city: String,
});

exports.User = mongoose.model('User', userSchema)