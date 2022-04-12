const mongoose = require('mongoose');
const { User } = require('./user');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        requierd: true
    }],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
		type:String,
		required:false
	},
    status: {
		type:String,
		required:false,
        default: 'Pending'
	},
    totalPrice: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateOrdered: {
        type: Date,
        deffault: Date.now
    }
});

orderSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

orderSchema.set('toJSON', {
	virtuals: true,
})

exports.Order = mongoose.model('Order', orderSchema)
exports.orderSchema = orderSchema