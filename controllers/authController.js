const User = require('../models/user');
const md5= require('md5');
exports.signUp=async (req,res)=>{
   
    const body = req.body;
     var accountnumber='';
     var balance=Math.random()*10000;
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
        balance:balance
        
  });
  user = await user.save();
  res.status(200).json({user});
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