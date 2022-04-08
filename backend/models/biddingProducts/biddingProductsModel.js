const mongoose = require('mongoose');

const biddingProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images:[
        {
            type: String
        }
    ],
    startingBidPrice:{
        type: Number,
        default: 20000,
        min: 20000,
        required: true,
    },
    currentBidPrice:{
        type: Number,
        default: 20000,
        min: 20000,
        required: true,
    },
    startTime:{
        type:Date
    },
    endTime:{
        type:Date
    }
});

exports.BiddingProduct = mongoose.model('BiddingProduct', biddingProductSchema);
