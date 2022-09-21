const User = require('../models/user');
const Admin = require('../models/admin');
const Transfer = require('../models/transfer');
const  Beneficiary = require('../models/beneficary');
const md5= require('md5');
//ADMIN
exports.Deposit=async(req,res)=>{
    const body = req.body;
    const amount=body.amount;
    const sender=body.sender;
    const receiver =body.receiver;
    const pin =body.pin;
  


    const Sender= await Admin.findOne({username:sender,pin:md5(body.pin)});
    const Receiver=await User.find({accountnumber:receiver});

    
  
    
    if(Sender!=null&&Receiver[0]!=null){
      
     let sender= Sender;
     let receiver=Receiver[0];
     
     const newsenderamount= parseFloat( sender.balance)-parseFloat(amount);
     const newreceiveramount= parseFloat( receiver.balance)+parseFloat(amount);
    
      Admin.updateOne({accountnumber:sender.accountnumber},{ $set: {balance: newsenderamount }}, function(err){
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
        
        var time=new Date(Date.now());
        let transfer= new  Transfer({
            senderusername:'Keep Safe',
            senderaccount:'KeepSafe Bank account',
            receiverusername:receiver.username,
            receiveraccount:receiver.accountnumber,
            amount:amount,
            narration:'Deposit from keep Safe Bank, keep banking on us!',
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

exports.fundAdmin=async(req,res)=>{
    const body= req.body;
    const username= body.username;
    const amount=parseFloat(body.balance);
    let  admin= await Admin.findOne({username:username});
   
    if(amount!=null&&username!=null&&admin!=null){
    const oldamount=parseFloat( admin.balance);
       

        let newamount= oldamount+amount;
        newamount=parseFloat(newamount);
      
      Admin.updateOne({username:username},{ $set: {balance: newamount }}, function(err){
        console.log(err);
            if(err){
             return   res.json({error:"Something went wrong try again later!",error:err});
            } else{
          res.status(200).json({status:'Transaction succesful',newamount:newamount});
            
            }
          });
    }else{
        res.status(404).json({error:'user not found '});
    }
}

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
            let exist=await Beneficiary.findOne({useraccount:sender.accountnumber, beneficiaryaccount:receiver.accountnumber});
           
            if(!exist){
                let beneficary= new Beneficiary({
                    useraccount:sender.accountnumber,  
                    beneficiaryusername:receiver.username,
                    beneficiaryaccount:receiver.accountnumber,
                });
                beneficary=await beneficary.save();
            }
            

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
exports.getBeneficary=async(req,res)=>{

    const user= req.body.accountnumber;
    
    if(user!=null){
        const beneficarylist=await Beneficiary.find({useraccount:user});
        if(beneficarylist!=null){
            res.json(beneficarylist);
        }else{
            res.status(404).json({error:'User not found'})
        }
    }else{
        res.status(400).json({error:"error"})
    }
}