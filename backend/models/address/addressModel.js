const mongoose =require("mongoose");
const {Schema} = mongoose;
const uniqueValidator =require("mongoose-unique-validator");

const addressSchema = new Schema({

    email:{
        type:String,
        require:true
    },
    userid:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    state:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    zip:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

addressSchema.set("toJSON",{
    transform:(document,returnedObject)=>{
        returnedObject.id= returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        //delete returnedObject.password;
    },
});

addressSchema.plugin(uniqueValidator,{message: "Email already in use"});

const Address=mongoose.model("address",addressSchema);
module.exports=Address;