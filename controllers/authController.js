const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const { sendVerificationCode } = require("../db/nodemailer");

const register = async (req, res, next) => {
  try {
    const { name, email, DOB, phoneNumber, language } = req.body;

    const validatePhoneNumber =  () => {
      /* The line `const phoneNumberToBeCleaned = phoneNumber.replace(/\D/g, "");` is removing all
  non-digit characters from the `phoneNumber` string. The regular expression `/\D/g` matches any
  non-digit character (`\D`) globally (`g`) in the string. So, this line essentially removes any
  non-digit characters from the `phoneNumber` string and assigns the result to the
  `phoneNumberToBeCleaned` variable. */
      const phoneNumberToBeCleaned = phoneNumber.replace(/\D/g, "");

      if (phoneNumberToBeCleaned.length !== 11) {
        throw new Error(" Invalid Phone number");
      }

      if (phoneNumberToBeCleaned.charAt(0) === "0") {
        const cleanedPhoneNumber = phoneNumberToBeCleaned.slice(1);
        const formattedPhoneNumber = cleanedPhoneNumber.padStart(13, "234");
        return formattedPhoneNumber; 
      }
    };
    const validPhoneNumber = validatePhoneNumber();
    console.log(validPhoneNumber); 

    const newUser = new User({
      name,
      email,
      DOB,
      phoneNumber: validPhoneNumber,
      language,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = User.findOne({ email: email });
    if (user != null) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      await sendVerificationCode({ email: user.email, token });
      res.status(200).json({ message: "Check your mail to continue" });
    }
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  const token = req.query.token;
  if (token == null) return res.status(401);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    /* The line `const user = User.find(u => u._id === decodedToken.userId)` is trying to find a
        user in the `User` array or collection (depending on the implementation of the `User` model)
        whose `_id` property matches the `decodedToken.userId`. It is essentially searching for a
        user with the same ID as the one decoded from the JWT token. */
    const user = User.find(u => u._id === decodedToken.userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { login, register, verify };
