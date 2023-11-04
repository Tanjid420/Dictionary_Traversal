const mongoose=require("mongoose")
const bcrypt=require("bcrypt");

const verificationTokenSchema = mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    token:{
        type:String,
         
    },
    createdAt:{
        type: Date,
        expires : 3600,
        default: Date.now()
    }

});

module.exports=mongoose.model('VerificationToken',verificationTokenSchema);