/* Authored by Meshwa Savalia, B00890170, ms959884@dal.ca
 */
const { use } = require("express/lib/application");
const mongoose  = require("mongoose");
const { Cart } = require("../../models/cart/cartModel");
const { Product } = require("../../models/products/productsModel");
const { getProductDetails } = require("../products/productsController");


exports.getCartDetails = async (req, res) => {

    const userId = "62313322509f340a3025b628";
    let cart = await Cart.findOne({ userId }); 
    const response=await Cart.aggregate([
        {
            $match:{
                userId:mongoose.Types.ObjectId(userId)
            }
        },
        {
            $project:{
                products:1,
                userId:1
            }
        },
        {
            $unwind:"$products", 
        },
        {
            $lookup:{
                from: "products",
                let: {product:"$products.productId"} ,
                pipeline:[  {
                    $match:{
                        $expr:{$eq:["$_id","$$product"]}
                       
                    }
                },
              ],
                as:"ProductDetails"
                
            }},
            {
                $unwind:"$ProductDetails", 
            },
            {
                $project:{
    
                    userId:1,
                    productId:"$products.productId",
                    productName:"$ProductDetails.name",
                    productImage:"$ProductDetails.image",
                    productPrice:"$ProductDetails.price",
                    productQuantity:"$products.quantity"
                    
                    
                }
            },
        
        
    ])
    
    // console.log(response);
   
    if(!cart)
    {
        res
        .send({ message: "User not found", success: false })
        .status(400);
    }
    else
    {
            res.send({ data: response, success: true }).status(200);
    }
      
  };


  
exports.addItemToCart = async (req, res) => {

    const userId = "62313322509f340a3025b628";
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            let productId=req.body.productId;
            let quantity = req.body.quantity;
            let index = cart.products.findIndex(p => p.productId == req.body.productId);
            if (index > -1) {
                //product exists in the cart, update the quantity
                let product = cart.products[index];
                product.quantity = product.quantity+ req.body.quantity ;
                cart.products[index] = product;
            } 
            else {
                //product does not exists in cart, add new item
                cart.products.push({ productId, quantity });
            }
            
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else {
            //no cart for user, create new cart
            productId=req.body.productId;
            quantity=req.body.quantity;
            const newCart = await Cart.create(
                {
                    userId: userId,
                    products: [{ productId, quantity}]
                });
            return res.status(201).send(newCart);
        }
    } 
    catch (err) {
          
        console.log(err);
        res.status(500).send("Something went wrong");
    }
  }

  exports.updateItemToCart = async (req, res) => {


    try {
        
const userId = "62313322509f340a3025b628";
let cart = await Cart.findOne({ userId }); 
        if(!cart) {
            return res.status(404).json({msg:"User Not Found"});
        }
            let quantity =req.body.quantity;
            if (quantity == 0){
                return await this.deleteItemFromCart(req, res);
            }
            let index = cart.products.findIndex(p => p.productId == req.body.productId);
            if (index > -1) {
                //product exists in the cart, update the quantity
                let product = cart.products[index];
                product.quantity = req.body.quantity;
                cart.products[index] = product;
            } 
            else {
                //product does not exists in cart, add new item
                return res.status(404).json({msg:"Product Non Found"});
            }
            cart = await cart.save();
            const response=await Cart.aggregate([
                {
                    $match:{
                        userId:mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $project:{
                        products:1,
                        userId:1
                    }
                },
                {
                    $unwind:"$products", 
                },
                {
                    $lookup:{
                        from: "products",
                        let: {product:"$products.productId"} ,
                        pipeline:[  {
                            $match:{
                                $expr:{$eq:["$_id","$$product"]}
                               
                            }
                        },
                      ],
                        as:"ProductDetails"
                        
                    }},
                    {
                        $unwind:"$ProductDetails", 
                    },
                    {
                        $project:{
            
                            userId:1,
                            productId:"$products.productId",
                            productName:"$ProductDetails.name",
                            productImage:"$ProductDetails.image",
                            productPrice:"$ProductDetails.price",
                            productQuantity:"$products.quantity"
                            
                            
                        }
                    },
                
                
            ])
            
            
            return res.status(200).send(response);
            
    } 
    catch (err) {
          
        console.log(err);
        res.status(500).send("Something went wrong");
    }
  }  
  
exports.deleteItemFromCart = async (req, res) => {
    const userId = "62313322509f340a3025b628";
    try {
        let userCart = await Cart.findOne({ userId });
        if(!userCart) {
            return res.status(400).json({msg:"Bad Request"});
        }
            let index = userCart.products.findIndex(p => p.productId == req.body.productId);
            if (index > -1) {
                //product exists in the cart, update the quantity
                let product = userCart.products[index];
                let productId=product.productId;
                userCart.products.splice(index,1);
              
            }
         /*    if(userCart.products.length==0){
                Cart.findByIdAndDelete(userId:userId)
            } */
            userCart = await userCart.save();
            return res.status(201).send(userCart);
        }
     
    catch (err) {
          
        console.log(err);
        res.status(500).send("Something went wrong");
    }
    
}
    