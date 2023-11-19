const User = require('../models/user');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const UserController = {
  showSignupForm: (req, res) => {
    res.render('signup');
  },

  signupUser: async (req, res) => {
    const { name, email, mobileNumber, password } = req.body;

    // Validate mobile number and email
    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      return res.status(400).json({status:false,message:'Invalid mobile number'});
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({status:false,message:'Invalid email'})
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({status:true,message:'User Already Exists Please Login'})
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // Save user to the database
    const newUser = new User({
      name,
      email,
      mobileNumber,
      password: hashedPassword,
      otp,
    });

    await newUser.save();

    // Send email verification

    // sendVerificationEmail(newUser.email, otp);


    res.json({status:true,otp:otp,message:'User registered successfully. Check your email for verification.'});
  },

  verifyOtp: async (req,res)=>{
    const {email,otp} = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser.otp === otp){
      res.json({status:true,message:'OTP verification Success'});
    await User.updateOne({ email },{isVerified:true});

  
    }else{
      
      res.json({status:true,message:'OTP verification Failed'});
      
  
    }
  },

  loginUser: async (req,res)=>{
    const {mobileNumber, password} = req.body;
    console.log(password,mobileNumber,"password")
 const existingUser = await User.findOne({ mobileNumber });

const passwordMatch = await bcrypt.compare(password, existingUser.password);

if(!existingUser.isVerified){
  res.json({status:true,message:'Verify your Otp'});
}
else 
if (passwordMatch) {

  
      res.json({status:true,message:'Login Success'});
  
    }else{
      
      res.json({status:true,message:'Login Failed'});
      
  
    }


  }

};



module.exports = UserController;


const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

function isValidEmail(email) {
  return emailPattern.test(email);
}

function generateOTP() {
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * digits.length);
    OTP += digits.charAt(randomIndex);
  }

  return OTP;
}







// Replace these values with your own email and SMTP server configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: '',
    pass: '',
  },
};

const transporter = nodemailer.createTransport(emailConfig);

function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: '',
    to: email,
    subject: 'Email Verification',
    html: `<p>Click the following link to verify your email: <a href="http://yourwebsite.com/verify/${verificationToken}">Verify Email</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error sending verification email:', error);
    }
    console.log('Verification email sent:', info.response);
  });
}



