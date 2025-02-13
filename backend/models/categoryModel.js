const { Schema, model } = require('mongoose');

const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
         type: String, 
         default: '' 
    },
    slug: {
        type: String,
        required: true,
        unique: true  
    },
}, { _id: false }); 

const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    subcategories: [subcategorySchema],
}, { timestamps: true });

// Use name to search
categorySchema.index({
    name: 'text'
});

module.exports = model('categories', categorySchema);
