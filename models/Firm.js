const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const firmSchema = new mongoose.Schema({
    firmname:{
        type: String,
        required: true,
        unique: true
    },
    category:{
        type: [{
            type: String,
            enum: ['veg', 'non-veg']
        }]   
    },
    region:{
        type: [{
            type: String,
            enum: ['southI', 'northI', 'chinese']
        }]   
    },
    offer:{
        type: String,
    },
    image:{
        type:String,
    },
    vendor:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }]
});

const Firm = mongoose.model('Vendor', firmSchema);
module.exports = Firm