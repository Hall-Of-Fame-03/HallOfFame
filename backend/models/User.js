import crypto from 'crypto';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose"; 
import validator from 'validator';

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter a name"],
    },
    
    email:{
        type: String,
        required: [true, "Enter your EmailID"],
        unique: true,
        validate: [validator.isEmail, "Enter a valid Email"]
    },
    password:{
        type: String,
        required: [true, "Enter your Password"],
        minlength: [6, "Password should be greater than 6 characters"]
    },
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post",
        },
    ],
    course: {
        type: String,
    },
    branch: {
        type: String,
    },
    year: {
        type: Number,
    },
    skillset: {
        type: [String]
    },
    bio: {
        type: String
    },
    setPublic: {
        type: Boolean,
        default: true,
    },
    followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    Nofollowers:{
        type: Number,
        default: 0
    },
    
    following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    Nofollowing:{
        type: Number,
        default: 0,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    
}, {timestamps: true}
);


UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  
    next();
});
  
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


UserSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
  

//Generating Password Reset Token
UserSchema.methods.getResetPasswordToken = function () {

    //Generating Tokeb
    const resetToken = crypto.randomBytes(20).toString("hex");
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}

export default mongoose.model("User", UserSchema)