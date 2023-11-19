
const User = require('../models/user');


const adminController = {
   
    userList: async (req,res)=>{
      const existingUser = await User.find({  });
     res.json({status:true,data:existingUser,message:'Successfully get'});
  }
  
  };
  
  
  
  module.exports = adminController;