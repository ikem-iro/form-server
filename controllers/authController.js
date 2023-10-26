const jwt = require('jsonwebtoken');

const User = require('../models/userModel');


const register = async ( req, res ) => {
    try {
        const { name, email, DOB, phoneNumber, language } = req.body;

        const validatePhoneNumber = () => {
            const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');


            if (cleanedPhoneNumber.length !== 11) {
                console.log("Invalid phone number");
            }

            if(cleanedPhoneNumber.charAt(0) === '0') {
                cleanedPhoneNumber.slice(1);
                console.log(cleanedPhoneNumber);
            }

        }
    }catch(error){
        next(error);
    }
}


const login = async (req, res) => {
    try{
        const { email } = req.body;
        const user = User.findOne({ email: email });
        if(user != null) {
          const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET, { expiresIn : "1h"});
        
        }

    }catch(error){
        next(error);
    }
}