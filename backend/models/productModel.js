const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    sellerId: {
        type: Schema.ObjectId,
        required: true
    },  
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String, 
        required: false
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mdescription: {
        type: String,
        required: false
    },
    
     howToUse: {
        type: String,
        required: false
    },

     ingredient: {
        type: String,
        required: false
    },

    shopName: {
        type: String,
        required: true
    },
    images: {
        type: [String], 
        required: true
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });


// Use name to search
productSchema.index({
    name: 'text',
    category: 'text',
    brand: 'text',
    description: 'text'
}, {
    weights: {
        name: 5,
        category: 4,
        brand: 3,
        description: 2
    }
    });

module.exports = model('products', productSchema);
