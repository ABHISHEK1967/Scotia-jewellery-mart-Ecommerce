const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const usersSchema = new Schema({
  firstname: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password should have at least 6 characters"],
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, "Phone no should be valid"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

usersSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    (returnedObject.id = returnedObject._id.toString()),
      (returnedObject.password = returnedObject.password);
    delete returnedObject._id;
    delete returnedObject.__v;
    //delete returnedObject.password;
  },
});

usersSchema.plugin(uniqueValidator, { message: "Email already in use" });

const Users = mongoose.model("users", usersSchema);
module.exports = Users;
usersSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

usersSchema.set("toJSON", {
  virtuals: true,
});
// exports.User = mongoose.model("User", userSchema);
