const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: String,
    image: String,
	color:String,
	icon: String,
});

exports.Category = mongoose.model('Category', categorySchema)