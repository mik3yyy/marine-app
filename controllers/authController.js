const User = require('../models/user');
const md5= require('md5');
const Admin = require('../models/admin');
const Card= require('../models/card');
exports.signUp=async (req,res)=>{
   
    const body = req.body;
     var accountnumber='';
    var exist = await User.findOne({username:body.username});
     
    if(exist){
        res.status(400).json({error:'Username already exist'});
    }else{

    
     for (var i =0; i<10;i++){
            accountnumber+=Math.round(Math.random()*9);
     }
    

    let user=User({
      
        name:body.name,
        lastname: body.lastname,
        email:body.lastname,
        phonenumber:body.phonenumber,
        dateofbirth:body.dateofbirth,
        gender:body.gender,
        username:body.username,
        password:md5(body.password),
        pin:md5(body.pin),
        bvn:body.bvn,
        accountnumber:accountnumber,
        balance:0.0005
        
  });
  user = await user.save();
  res.status(200).json({user});
  }
}

exports.login=async(req,res)=>{
     const body=req.body;
    let user;
    
    if(body.hashed==true){
        user= await User.findOne({username:body.username,password:body.password});
    }else{
        user= await User.findOne({username:body.username,password:md5(body.password)});
    }



    if(user==null){
        res
        .status(400)
        .json({ msg: "User with this Username or password does not exist!" });
    }else{

    res.json(user);
    }

}
exports.signUpAdmin =async(req,res)=>{
    const body = req.body;

    var exist = await Admin.findOne({username:body.username});
     
    if(exist){
        res.status(400).json({error:'Username already exist'});
    }else{
    if(body.username!=null&& body.pin!=null&&body.balance!=null){
        var accountnumber='';
     
          for (var i =0; i<10;i++){
            accountnumber+=Math.round(Math.random()*9);
         }

        let admin = new Admin({
            username:body.username,
            pin:md5(body.pin),
            accountnumber:accountnumber,
            balance:body.balance
        });
        admin= await  admin.save();

        if(admin!=null){
            res.json(admin);
        }else{
            res.status(400).json({error:"unable to create admin"})
        }
    }else{
        res.status(404).json({error:"input all the necessary"});

    }

}
}
exports.createcard= async(req,res)=>{
    const body = req.body;
    const accountnumber= body.accountnumber;
    const accountname=body.accountname;
    const color= body.color;
    const blocked= body.blocked;
    const pin =body.pin;
    if(accountname!=null&&accountnumber!=null){
        let cardnumber ='';
        let cvv='';
        for (var j=0;j!=20;j=j+0){
            
            for(var i=0; i<16;i++){ 
            cardnumber+=Math.round(Math.random()*9);
            }
            for(var i=0;i<3;i++){
                cvv+=Math.round(Math.random()*9); 
            }
            
            var exist=await Card.findOne({$or:[{cardnumber:cardnumber},{cvv:cvv}]});
            
            if(!exist){
                j=20;
            }

        }

        


    var date = new Date();
    var futureYear = date.getFullYear() + 4;
    date.setFullYear(futureYear);
  

    let card = new Card({
        accountnumber:accountnumber,
        cardnumber:cardnumber,
        cardname:accountname,
        validMonth:date.getMonth()+1,
        validYear:date.getFullYear(),
        cvv:cvv,
        color:color,
        blocked:blocked,
        pin:pin
    });
    card =await card.save();
    res.status(200).json({status:"succesful"});
   
    }else{
        res.status(400).json({error:"error, try again"});
    }
}
exports.getCards =async(req,res)=>{
    const body = req.body;
    const accountnumber= body.accountnumber;
    // console.log(accountnumber);
    if (accountnumber!=null){
        let cards=await Card.find({accountnumber:accountnumber});
        // console.log(cards); 
        if(cards[0]!=null){
            res.json(cards);
        }
        else{
            res.status(200).json({empty:"no cards"});
        }
        
    }else{
        res.status(400).json({error:"error,try again"});
    }

}
