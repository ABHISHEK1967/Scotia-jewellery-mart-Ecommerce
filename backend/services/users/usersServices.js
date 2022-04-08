const User = require("../../models/users/userModel");
const Address = require("../../models/address/addressModel");

const bcrypt= require('bcryptjs');
const { response } = require('express');

async function login({email,password}, callback)
{
    const user = await User.findOne({email});
    if(user !=null){
        if(bcrypt.compareSync(password,user.password))
        {
            // const token=auth.generateAccessToken(username);
            // return callback(null,{...user.toJSON(),token})
            return callback(null,user.toJSON())
        }
        else{
            return callback({
                message:"Invalid Username/Password"
            })
        }
    }
    else{
        return callback({
            message:"Invalid Username/Password"
        })
    }
}

async function register(params,callback){
    
    const user= new User(params);
    user.save()
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function profile(userid,callback)
{
    const userProfile = await User.findOne({ _id:userid});
    if(userProfile !=null)
    {
            return callback(null,{...userProfile.toJSON()})
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
            message:"Error is updating profile"
        })
    }
    const email =params.email
    const userProfile = await User.findOneAndUpdate({email},
        { $set:
            {
                "firstname":params.firstname,
                "lastname":params.lastname,
                "phone":params.phone
             }
         }, { returnOriginal: false } );

         if(userProfile !=null)
         {
                 return callback(null,{...userProfile.toJSON()})
         }
         else{
             return callback({
                 message:"Unable to update records"
             })
         }
}

async function getAllUsers(params,callback){
   
    const users  = await User.find({});

         if(users !=null)
         {
                 return callback(null,{...users})
         }
         else{
             return callback({
                 message:"Unable to get user records"
             })
         }
}




async function changepassword (params,callback){
    
    if(params==null)
    {
        return callback({
            message:"Password is required"
        })
    }
    const email =params.email;
    const password=params.password;
    const userProfile = await User.findOneAndUpdate({email},
        { $set:
            {
                "password":password
             }
         }, { returnOriginal: false } );
    if(userProfile !=null)
         {
            console.log("Service : "+userProfile)
            return callback(null)
         }
    else{
        return callback({message:"Unable to update password"})
        }  
}

async function forgotpassdetails(params,callback){
    if(params==null)
    {
        return callback({
            message:"Details are required"
        })
    }

    const filter ={email:params.email,phone:params.phone}
    const update = { password: params.password };
    const userProfile = await User.findOneAndUpdate(filter,update, { returnOriginal: false });
    if(userProfile !=null|| userProfile!=undefined)
         {
            return callback(null,userProfile)
         }
    else{
        return callback({message:"Incorrect Details"})
        }  
}

async function addaddress(params,callback){
    
    const address= new Address(params);
    address.save()
    .then((response)=>{
        return callback(null, response);
    })
    .catch((error)=>{
        return callback(error);
    });
}

async function getalladdressbyuser(userid,callback){
    
    const allAddress = await Address.find({userid:userid});
    if(allAddress !=null)
    {
            return callback(null,allAddress)
    }
    else{
        return callback({
            message:"No Address for user"
        })
    }
}

async function deleteaddressbyid(id,callback){
    const result =await Address.deleteOne({ _id: id });
    if(result.deletedCount>0)
    {
        return callback(null,"Address Deleted Successfully")
    }
    else{
        return callback({
            message:"Address Not found"
        })
    }
}

async function deleteprofile(id,callback){
    const result =await User.deleteOne({ email: id });
    if(result.deletedCount>0)
    {
        return callback(null,"User Deleted Successfully")
    }
    else{
        return callback({
            message:"User Not found"
        })
    }
}




module.exports={
    login,
    register,
    profile,
    editProfile,
    getAllUsers,
    changepassword,
    forgotpassdetails,
    addaddress,
    getalladdressbyuser,
    deleteaddressbyid,
    deleteprofile
}