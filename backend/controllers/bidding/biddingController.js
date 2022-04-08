/* =======================================================
 Author: [Anita Kumari] (an954221@dal.ca)
=======================================================  */

const { BiddingProduct } = require("../../models/biddingProducts/biddingProductsModel");
const { Bidders } = require("../../models/biddingProducts/biddersModel");
const cloudinary = require("cloudinary").v2;
const moment = require('moment');

cloudinary.config({
  cloud_name: "dkjbxujnu",
  api_key: "384624719665962",
  api_secret: "v-gEZoflAk5eakpiLrUKFjMr1-U",
});


exports.getAllBiddingProducts = async (req, res) => {
    const biddingProductList = await BiddingProduct.find({});
    if (!biddingProductList) {
      res.send({ message: "No bidding products available"}).status(500);
    }
    res.send({ biddingProducts: biddingProductList });
};

exports.getAvailableBiddingProducts = async (req, res) => {
    const biddingProductList = await BiddingProduct.find({
        startTime: { $lte: new Date().toISOString() },
        endTime: { $gte: new Date().toISOString() }
    });
    if (!biddingProductList) {
      res.send({ message: "No bidding products available"}).status(500);
    }
    res.send({ biddingProducts: biddingProductList });
};

exports.getBiddersDetails = async (req, res) => {
  const biddersDetails = await Bidders.find(
    {
        userId: req.userId,
        biddingProductId:  req.biddingProductId
    }
  );
  if (!biddersDetails || biddersDetails.length==0) {
    return res.send({ message: "Never bid for the same product before"}).status(200);
  }
 return  res.send({ bidders: biddersDetails }).status(200);
};


exports.getAllBidders = async (req, res) => {
  const bidders = await Bidders.find({});
  if (!bidders || bidders.length==0) {
    return res.send({ message: "Bidders not found",status:false}).status(500);
  }
 return  res.send({ bidders: bidders,status:true }).status(200);
};

exports.getBiddersByProductId = async (req, res) => {
  console.log("Bidders Id"+req.params.id);
  const bidders = await Bidders.find({biddingProductId:req.params.id});
  if (!bidders || bidders.length==0) {
    return res.send({ message: "Bidders not found",status:false}).status(500);
  }
 return  res.send({ bidders: bidders,status:true }).status(200);
};

exports.getHighestBiddedAmountByProductId = async (req, res) => {
  const biddersDetails = await Bidders.find({biddingProductId: req.params.id}).sort({bid_amount : -1}).limit(1);
  if (!biddersDetails || biddersDetails.length==0) {
    return res.send({ message: 0,success:false}).status(500);
  }
 return  res.send({ bidders: biddersDetails,success:true }).status(200);
};

exports.createBiddingProduct = async (req, res) => {
    const biddingProduct = new BiddingProduct({
        name: req.body.name,
        description: req.body.description,
        images:req.body.images || [],
        startingBidPrice: req.body.startingBidPrice,
        currentBidPrice: req.body.currentBidPrice,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });

    biddingProduct.save().then((prod) => {
        res.send({ data: prod, success: true }).status(201);
    }).catch((err) => {
        res.send({ error: err, success: false }).status(500);
    });
};

exports.updateBiddingProducts = async (req, res) => {
  
    const biddingProductDetails = await BiddingProduct.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            images:req.body.images || [],
            startingBidPrice: req.body.startingBidPrice,
            currentBidPrice: req.body.currentBidPrice,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        },
        { new: true }
      );
      if (!biddingProductDetails) {
        res
          .send({
            message:
              "Bididing product for the Id  not found in the inventory and hence couldn't update it",
            success: false,
          })
          .status(500);
      }
      res.send({ biddingProductDetails: biddingProductDetails, success: true }).status(200);
};

exports.getBiddingProductById = async (req, res) => {
    const biddingProductDetails = await BiddingProduct.findById(req.params.id);
      if (!biddingProductDetails) {
        res
          .send({ message: "No products avaiablble for bidding for given ID", success: false })
          .status(500);
      }
      res.send({ biddingProduct: biddingProductDetails, success: true }).status(200);
};

exports.placeABid = async (req, res) => {
  const placeABidParam=new Bidders({
      userId:req.body.userId,
      biddingProductId:req.body.biddingProductId,
      bid_amount:req.body.bid_amount,
      bid_status:req.body.bid_status || null,
  });

  console.log("I am outside placeABid logs");
  if(placeABidParam.userId && placeABidParam.biddingProductId){
    // console.log("I am in placeABid logs");
    await BiddingProduct.findById(placeABidParam.biddingProductId).then(async(bidProd)=>{
      let timeDiff = moment(moment(bidProd.endTime,"YYYY-MM-DD")).diff(moment().format("YYYY-MM-DD"), 'seconds');
      const biddersDetails = await Bidders.find(
        {
            
            biddingProductId:  placeABidParam.biddingProductId
        }
      ).sort({bid_amount : -1}).limit(1);
      
      if(timeDiff>10){
       // console.log("I am in timeDiff"+JSON.stringify(biddersDetails));
        if(biddersDetails && biddersDetails.length>0){
          console.log("I am in timeDiff biddersDEtails");
          if(biddersDetails[0]["bid_amount"]<placeABidParam.bid_amount){
            await Bidders.findOneAndUpdate(
              {
                  userId: placeABidParam.userId,
                  biddingProductId:  placeABidParam.biddingProductId
              },
              {
                bid_amount: placeABidParam.bid_amount ,
                bid_status:"HIGHEST"
              },
              {new:true}
            ).then(async(biddersBiddingAmountValidation)=>{
              // console.log("check my validation amount"+biddersBiddingAmountValidation);
              if(biddersBiddingAmountValidation){
                return res.send({ biddersDetails: biddersBiddingAmountValidation, success: true }).status(200); 
              }else{
                await placeABidParam.save().then((bidders) => {
                  return res.send({ biddersDetails: bidders, success: true }).status(201);
                }).catch((err) => {
                    return res.send({ msg: err, success: false }).status(500);
                });
              }
            }).catch(err=>{
              return res.send({ msg: err, success: false }).status(500);
            });
          }else{
            return res.send({ msg: "Bidding Amount is less than last bidded amount", success: false }).status(500);
          }

        }else{
          await placeABidParam.save().then((bidders) => {
            return res.send({ biddersDetails: bidders, success: true }).status(201);
          }).catch((err) => {
              return res.send({ msg: err, success: false }).status(500);
          });
        }
      }else{
  
        await Bidders.findOneAndUpdate(
          {
              biddingProductId:  placeABidParam.biddingProductId
          },
          {
            bid_status: 'WINNER'
          },
          {new:true}
        ).sort({bid_amount : -1}).then(biddersBiddingAmountValidation=>{
          return res.send({ msg: "Bidding Time Elapsed", success: false }).status(500);
        }).catch(err=>{
          return res.send({ msg: err, success: false }).status(500);
        });
        
      }
    }).catch(err=>{
      console.log(err);
      return res.send({ error: "either ERR", success: false }).status(500); 
      
    });
  }else{
    return res.send({ error: "either userID or product is not selected", success: false }).status(500); 
  }
    
};


exports.biddingHistory = async (req, res) => {
  let param=req.params.userId;
  await Bidders.find({userId: param}).populate("biddingProductId").then( (biddingProductDetails)=>{
    console.log(biddingProductDetails.length+ "  Length");
    console.log("Bidding details"+JSON.stringify(biddingProductDetails));
    
    if(biddingProductDetails.length>0){
      let maxBiddingamount=Number.MIN_VALUE;
      let highestIndex=-1;
      //console.lo
      for(let i=0;i<biddingProductDetails.length;i++){
        if(biddingProductDetails[i].bid_amount>maxBiddingamount){
          maxBiddingamount=biddingProductDetails[i].bid_amount;
          highestIndex=i;
        }
      }

      console.log(highestIndex+ "HIghets calue");
      if(highestIndex>-1){
        biddingProductDetails[highestIndex].bid_status="WINNER";
      }

      res.send({ biddingHistory: biddingProductDetails, success: true }).status(200);
    }else{
      res
      .send({ message: "Please bid to have history!", success: false })
      .status(500);
    }
  }).catch(err=>{
    console.log(" In err catch"+err);
    res
    .send({ message: "Please bid to have history!", success: false })
    .status(500); 
  });
};
