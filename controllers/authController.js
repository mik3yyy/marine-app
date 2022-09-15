const User = require('../models/user');
const md5= require('md5');
const Admin = require('../models/admin');
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
        res.status(404).json({error:"input all the necessary"})

    }

}
}