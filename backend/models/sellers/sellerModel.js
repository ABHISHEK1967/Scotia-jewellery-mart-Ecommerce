const mongoose =require("mongoose");
const {Schema} = mongoose;
const uniqueValidator =require("mongoose-unique-validator");

const sellersSchema = new Schema({

    firstname:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Password should have at least 6 characters"]
    },
    phone:{
        type:String,
        required:true,
        minlength:[10,"Phone no should be valid"]
    },
    seller_address:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    bankname:{
        type:String,
        required:true,
    },
    accountno:{
        type:String,
        required:true,
    },
    sin:{
        type:String,
        required:true,
    },
    accounttype:{
        type:String,
        required:true,
    },
    zipcode:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

sellersSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
        returnedObject.id= returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    },
});

sellersSchema.plugin(uniqueValidator,{message: "Email already in use"});

const Sellers=mongoose.model("sellers",sellersSchema);
module.exports=Sellers;