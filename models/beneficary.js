const mongoose= require('mongoose');

const BeneficiarySchema = mongoose.Schema({
    
    useraccount:{
        type:String,
        required: true,
        trim:true
    },
    
    beneficiaryusername:{
        type:String,
        required: true,
        trim:true
    },
    beneficiaryaccount:{
        type:String,
        required: true,
        trim:true
    },

});

const Beneficiary = mongoose.model('beneficiary',BeneficiarySchema);

module.exports=Beneficiary;