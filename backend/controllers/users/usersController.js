const bcryptjs= require('bcryptjs');
const userService = require ('../../services/users/usersServices');

// exports.register =async (req,res)=>{
//   const {password} = req.body;
//   const salt = bcryptjs.genSaltSync(10);
//   req.body.password=bcryptjs.hashSync(password,salt);

//   const user= new User(req.body);
//   user.save()
//   .then((response)=>{
//       res.send({ message:"User Registered Successfully", data: response, success: true }).status(201);
//   })
//   .catch((err)=>{
//       res.send({message:"Can't Register User", error: err, success: false }).status(500);
//   });
// };

// exports.login =async (req,res)=>{
//   const {email,password}= req.body;
//    value=null;
//     if(email&&password)
//     {
//       const user = await User.findOne({email});
//     if(user !=null){
//         if(!bcryptjs.compareSync(password,user.password))
//         {
//           res.status(403).send({ message:"Invalid Password", success: false})
//         }
//         value={message:"Success",data:user.toJSON(),success: true};
//     }
//     else{
//       res.status(403).send({ message:"User Does not exist", success: false})
//     }
//     }
//     else{
//         res.status(400).send({message:"Email id  and password is required to login", success: false});
//     }
//     res.status(200).send(value);
// };

exports.register =(req,res,next)=>{
  const {password} = req.body;
  const salt = bcryptjs.genSaltSync(10);
  req.body.password=bcryptjs.hashSync(password,salt);

  userService.register(req.body,(error,result)=>
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
  if(email&&password)
  {
      userService.login({email,password},(error,result)=>{

          if (error){
              return res.status(403).send({
                  errors:error
              })
          }
          return res.status(200).send({
              message:"Success",
              data: result
          });
      });
  }
  else{
      return res.status(400).send({
          message:"Email id and password is required to login"
      });
  }
  
};
exports.profile = (req,res,next)=>{
  const userid= req.params.id;
  if(userid){
      userService.profile(userid,(error,result)=>
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
  else{
      return res.status(400).send({
          message:"Email id is required to get profile details"
      });
  }
  
  //  return res.status(200).json({message:"Authorized User!",data:res});
}
exports.editprofile = (req,res,next)=>{
  userService.editProfile(req.body,(error,result)=>
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

exports.getallusers = (req,res,next)=>{
    userService.getAllUsers(req.body,(error,result)=>
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
  
exports.changepassword= (req,res,next)=>{
  const {password} = req.body;
  if(password)
  {
  const salt = bcryptjs.genSaltSync(10);
  req.body.password=bcryptjs.hashSync(password,salt);
  userService.changepassword(req.body,(error,result)=>
  {
      if(error){
        return res.status(403).send({
          errors:error });
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

exports.forgotpassdetails=(req,res,next)=>{
  const password = req.body.password;
  if(password)
  {
  const salt = bcryptjs.genSaltSync(10);
  req.body.password=bcryptjs.hashSync(password,salt);
  userService.forgotpassdetails(req.body,(error,result)=>
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
  else{
      return res.status(400).send({
          message:"password cant be empty"
      });
  }
  
}

exports.addaddress= (req,res,next)=>{
  userService.addaddress(req.body,(error,result)=>
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

exports.getalladdressbyuser= (req,res,next)=>{
  const userid= req.params.id;
  if(userid){
      userService.getalladdressbyuser(userid,(error,result)=>
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
  else{
      return res.status(400).send({
          message:"email required"
      });
  }
}

  exports.deleteaddressbyid=(req,res,next)=>{
      const addressId= req.params.id;
      if(addressId)
      {
          userService.deleteaddressbyid(addressId,(error,result)=>
      {
          if(error){
            return res.status(403).send({
              errors:error });
          }
          return res.status(200).send({
              message:"Address Deleted Successfully"
          });
      });
      }
      else{
          return res.status(400).send({
              message:"Address Id required"
          });
      }

  }

  exports.deleteprofile=(req,res,next)=>{
      const email= req.params.id;
  if(email){
      userService.deleteprofile(email,(error,result)=>
      {
          if(error){
            return res.status(403).send({
              errors:error });
          }
          return res.status(200).send({
              success:"true",
              message:"User deleted"
          });
      });
  }
  else{
      return res.status(400).send({
          message:"email required"
      });
  }

}