const {Schema, model} = require('mongoose')

const sellerSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    password : {
        type : String,
        required: true,
        select : false
    },
    role : {
        type : String,
        default :'seller'
    },
    status : {
        type : String,
        default :'pending'
    },
    payment : {
        type : String,
        default :'inactive'
    },
    method : {
        type : String,
        required: true
    },
    image : {
        type : String,
        default :''
    },
    shopInformation : {
        type : Object,
        default :{}
    },
}, {timestamps : true}   
)

// Use name to search
sellerSchema.index({
        name: 'text',
        email: 'text'
    }, {
    weights: {
        name: 4,
        email: 4
    }
    });
module.exports = model('sellers', sellerSchema)
