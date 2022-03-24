const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    product_id: String,
    image: String,
	user: String,
    dateOfOrder: Date,
    totalPrice: Number,
    status: Boolean,
    phone: Number,
    country: {
		type:String,
		required:false
	}
});

exports.Order = mongoose.model('Order', orderSchema)