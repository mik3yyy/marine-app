

const Ehandler = async (res, code,message )=>{
   

  res.status(code).json({
    status: false,
    message,
    },);
  }

// export default  error;
module.exports=Ehandler;