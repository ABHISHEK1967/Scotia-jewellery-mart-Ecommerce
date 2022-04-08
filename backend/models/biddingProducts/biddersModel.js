const mongoose = require('mongoose');

const biddersSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // for our 
        required: true,
    },
    bid_amount: {
        type: Number,
        required: true,
        default: 20000
    },
    bid_status:
    {
        type: String
    },
    biddingProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BiddingProduct", // for our 
        required: true,
    }     
});




exports.Bidders = mongoose.model('Bidders', biddersSchema);