const User = require('../models/user');
const Transfer = require('../models/transfer');
const  Beneficiary = require('../models/beneficary');

//USED TO AUTHENTICATE ACCOUNT
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
//USED TO TRANSFER TO ACCOUNT
exports.Transfer=async (req,res)=>{
    const body = req.body;
    const amount=body.amount;
    const sender=body.sender;
    const receiver =body.receiver;
    const narration =body.narration;
    const beneficiary= body.beneficiary;

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
        if(beneficiary=='true'){
            let beneficary= new Beneficiary({
                useraccount:sender.accountnumber,  
                beneficiaryusername:receiver.username,
                beneficiaryaccount:receiver.accountnumber,
            });
            beneficary=await beneficary.save();

        }else if(beneficiary==null||beneficiary==''||beneficiary=='false'){
    
        }
        var time=new Date(Date.now());
        let transfer= new  Transfer({
            senderusername:sender.username,
            senderaccount:sender.accountnumber,
            receiverusername:receiver.username,
            receiveraccount:receiver.accountnumber,
            amount:amount,
            narration:narration,
            sendernewbalance:newsenderamount,
            receivernewbalance:newreceiveramount,
            time:time.getHours(),
            day:time.getDate(),
            month:time.getMonth(),
            year:time.getFullYear()
            
        });
        
        transfer = await transfer.save();



        res.json({status:"Suceffully Transfer",newamout:newsenderamount});

    }else{
    res.json({error:"Something went wrong try again later!"});
    }

}
//USED TO GET USERS 
exports.TransferHistory= async(req,res)=>{
    const body= req.body;

    
    if(body.accountnumber!=null){
        let userHistory=await Transfer.find({$or:[{senderaccount: body.accountnumber},{receiveraccount:body.accountnumber}]});
        if(userHistory){
            res.json(userHistory);

        }else{
            res.status(404).json({status:'no transaction'});
        }
    }else{
        res.status(400).json({error:'please input accountnumber'})
    }
    
}
