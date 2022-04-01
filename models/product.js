const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
		type: String,
		required:true,
	},
	description: {
		type: String,
		required: true,
	},
	richDescription: {
		type:String,
		default: '',
	},
    image: {
		type:String
	},
	brand: {
		type: String, 
		default: '',
	},
	price: {
		type: Number,
		default: 0
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	},
	countInStock: {
		type: Number,
		required: true,
		min:0,
		max:255
	},
	rating: {
		type: Number,
	},
	isFeatured: {
		type: Boolean,
		default: false
	},
	numReviews: {
		type: Number,
		min:0,
	}
});
productSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

productSchema.set('toJSON', {
	virtuals: true,
})

exports.Product = mongoose.model('Product', productSchema)
exports.productSchema = productSchema