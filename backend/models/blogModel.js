const { Schema, model } = require('mongoose');

const blogSchema = new Schema({
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
    brand: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    first_topic: {
        type: String,
        required: false
    },
    
     first_description: {
        type: String,
        required: false
    },
    second_topic: {
        type: String,
        required: false
    },
    second_description: {
        type: String,
        required: false
    },
    third_topic: {
        type: String,
        required: false
    },
    third_description: {
        type: String,
        required: false
    },
    forth_topic: {
        type: String,
        required: false
    },
    forth_description: {
        type: String,
        required: false
    },
    fifth_topic: {
        type: String,
        required: false
    },
    fifth_description: {
        type: String,
        required: false
    },
    shopName: {
        type: String,
        required: false
    },
    images: {
        type: [String], 
        required: true
    }
}, { timestamps: true });


// Use name to search
blogSchema.index({
    name: 'text',
    title: 'text',
    brand: 'text',
    description: 'text'
}, {
    weights: {
        name: 5,
        title: 4,
        brand: 3,
        description: 2
    }
    });

module.exports = model('blogs', blogSchema);
