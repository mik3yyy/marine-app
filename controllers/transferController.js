const User = require('../models/user');
const Transefer = require('../models/transfer');

exports.findAccount= async(req,res)=>{
    const body=req.body;
    const user=await User.findOne({accountnumber:body.accountnumber});
   
    if(user){
        
        res.json({accountnumber:user.accountnumber,username:user.username});
    }
    else{
        res.json({error:"This user does not exist"});
    }
}

exports.Transefer=async (req,res)=>{
    const body = req.body;
    const amount=body.amount;
    const sender=body.sender;
    const receiver =body.receiver;

    const Sender= await User.find({accountnumber:sender});
    const Receiver=await User.find({accountnumber:receiver});
    
    
    
    if(Sender[0]!=null&&Receiver[0]!=null){
      
     let sender= Sender[0];
     let receiver=Receiver[0];
     
     const newsenderamount= parseFloat( sender.balance)-parseFloat(amount);
     const newreceiveramount= parseFloat( receiver.balance)+parseFloat(amount);
    
      User.updateOne({accountnumber:sender.accountnumber},{ $set: {balance: newsenderamount }}, function(err){
        if(err){
         return   res.json({error:"Something went wrong try again later!",error:err});
        } else{
        
        }
      });
       User.updateOne({accountnumber:receiver.accountnumber},{ $set: {balance: newreceiveramount }},function(err){
        if(err){
          return  res.json({error:"Something went wrong try again later!",error:err});
          } else{
        
          }
        });

        res.json({status:"Suceffully Transfer"});

    }else{
    res.json({error:"Something went wrong try again later!"});
    }

}