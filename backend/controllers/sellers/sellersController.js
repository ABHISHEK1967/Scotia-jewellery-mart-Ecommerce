const bcryptjs= require('bcryptjs');
const sellerService = require ('../../services/sellers/sellersServices');


exports.register =(req,res,next)=>{
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);
    req.body.password=bcryptjs.hashSync(password,salt);

    sellerService.sellerRegister(req.body,(error,result)=>
    {
        if(error){
            return next (error);
        }
        return res.status(200).send({
            message:"Success",
            data:result,
        });
    });
};

exports.login = (req,res,next)=>{

    const {email,password}= req.body;
    sellerService.sellerLogin({email,password},(error,result)=>{

        if (error){
            return next(error);
        }
        return res.status(200).send({
            message:"Success",
            data: result
        });
    });
};

exports.profile = (req,res,next)=>{
   
    const sellerId= req.params.id;
    if(sellerId){
        sellerService.sellerProfile(sellerId,(error,result)=>
        {
            if(error){
                return next (error);
            }
            return res.status(200).send({
                message:"Success",
                data:result,
            });
        });
    }
    else{
        return res.status(400).send({
            message:"seller id is required to get profile details"
        });
    }
}
exports.editprofile = (req,res,next)=>{
   
    sellerService.editProfile(req.body,(error,result)=>
    {
        if(error){
            return next (error);
        }
        return res.status(200).send({
            message:"Success",
            data:result,
        });
    });
}

exports.getallsellers = (req,res,next)=>{
    sellerService.getAllSellers(req.body,(error,result)=>
    {
        if(error){
          return res.status(403).send({
            errors:error });
        }
        return res.status(200).send({
            message:"Success",
            data:result,
        });
    });
  }

exports.deletesellerprofile=(req,res,next)=>{
    const email= req.params.id;
if(email){
    sellerService.deleteSellerProfile(email,(error,result)=>
    {
        if(error){
            return next (error);
        }
        return res.status(200).send({
            success:"true",
            message:"Seller profile deleted"
        });
    });
}
else{
    return res.status(400).send({
        message:"email required"
    });}
}
exports.changepassword= (req,res,next)=>{
    const {password} = req.body;
    if(password)
    {
    const salt = bcryptjs.genSaltSync(10);
    req.body.password=bcryptjs.hashSync(password,salt);
    sellerService.changePassword(req.body,(error,result)=>
    {
        if(error){
            return next (error);
        }
        return res.status(200).send({
            message:"Successfully changed password"
        });
    });
    }
    else{
        return res.status(400).send({
            message:"password cant be empty"
        });
    }
    
}

exports.forgotpassword=(req,res,next)=>{
    const password = req.body.password;
    if(password)
    {
    const salt = bcryptjs.genSaltSync(10);
    req.body.password=bcryptjs.hashSync(password,salt);
    sellerService.forgotPassword(req.body,(error,result)=>
    {
        if(error){
            return next (error);
        }
        return res.status(200).send({
            message:"Success",
            data:result,
        });
    });
    }
    else{
        return res.status(400).send({
            message:"password cant be empty"
        });
    }  
}
