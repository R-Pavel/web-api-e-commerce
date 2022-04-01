const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
		type:String,
		requird: true
	},
	email: {
		type:String,
		required: true
	},
	passwordHash: {
		type:String,
		required: true
	},
	apartment: {
		type:String,
		default: ''
	},
	city: {
		type:String,
		default: ''
	},
	zip: {
		type: String,
		default: ''
	},
	counrty: {
		type:String,
		default: ''
	},
	street: {
		type:String,
		default: ''
	},
	phone: {
		type: Number,
		required: true
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
});

userSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

userSchema.set('toJSON', {
	virtuals: true
})

exports.User = mongoose.model('User', userSchema)
exports.userSchema = userSchema