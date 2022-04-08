const Sellers = require("../../models/sellers/sellerModel");
const bcrypt= require('bcryptjs');
const { response } = require('express');

async function sellerLogin({email,password}, callback)
{
    const seller = await Sellers.findOne({email});
    if(seller !=null){
        if(bcrypt.compareSync(password,seller.password))
        {
            return callback(null,seller.toJSON())
        }
        else{
            return callback({
                message:"Invalid Username/Password"
            })
        }
    }
    else{
        return callback({
            message:"Email not registered with us"
        })
    }
}

async function sellerRegister(params,callback){
    if(params.firstname==null)
    {
        return callback({
            message:"firstname is Required"
        })
    }
    else if(params.lastname==null)
    {
        return callback({
            message:"lastname is Required"
        })
    }

    const seller= new Sellers(params);
    seller.save()
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function sellerProfile(sellerId,callback)
{
    const sellerProfile = await Sellers.findOne({_id:sellerId});
    if(sellerProfile !=null)
    {
            return callback(null,{...sellerProfile.toJSON()})
    }
    else{
        return callback({
            message:"Email doesn't exist in records"
        })
    }
    
}


async function editProfile(params,callback){
    if(params.email==null)
    {
        return callback({
            message:"Error is updating profile (email missing)"
        })
    }
    const email =params.email
    const sellerProfile = await Sellers.findOneAndUpdate({email},
        { $set:
            {
              "firstname":params.firstname,
              "lastname":params.lastname,
              "phone":params.phone,
              "country":params.country,
              "bankname":params.bankname,
              "accountno" :params.accountno
             }
         }, { returnOriginal: false } );

         if(sellerProfile !=null)
         {
                 return callback(null,{...sellerProfile.toJSON()})
         }
         else{
             return callback({
                 message:"Unable to update records"
             })
         }

}

async function getAllSellers(params,callback){
   
    const sellers  = await Sellers.find({});

         if(sellers !=null)
         {
                 return callback(null,{...sellers})
         }
         else{
             return callback({
                 message:"Unable to get sellers records"
             })
         }
}

async function deleteSellerProfile(id,callback){
    const result =await Sellers.deleteOne({ email: id });
    if(result.deletedCount>0)
    {
        return callback(null,"Seller Deleted Successfully")
    }
    else{
        return callback({
            message:"Seller Not found"
        })
    }
}

async function changePassword (params,callback){
    
    if(params==null)
    {
        return callback({
            message:"Password is required"
        })
    }
    const email =params.email;
    const password=params.password;
    const sellerProfile = await Sellers.findOneAndUpdate({email},
        { $set:
            {
                "password":password
             }
         }, { returnOriginal: false } );
    if(sellerProfile !=null)
         {
            //console.log("Service : "+sellerProfile)
            return callback(null)
         }
    else{
        return callback({message:"Unable to update password"})
        }  
}

async function forgotPassword(params,callback){
    if(params==null)
    {
        return callback({
            message:"Details are required"
        })
    }

    const filter ={email:params.email,phone:params.phone}
    const update = { password: params.password };
    const sellerProfile = await Sellers.findOneAndUpdate(filter,update, { returnOriginal: false });
    if(sellerProfile !=null|| sellerProfile!=undefined)
         {
            return callback(null,sellerProfile)
         }
    else{
        return callback({message:"Incorrect Details"})
        }  
}


module.exports={
    sellerLogin,
    sellerRegister,
    sellerProfile,
    editProfile,
    getAllSellers,
    deleteSellerProfile,
    forgotPassword,
    changePassword
}