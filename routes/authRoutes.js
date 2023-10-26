const {Router} = require('express');
const  registerRateLimit = require('../middlewares/rateLimit')

const router = Router();

const { register, login, verify } = require("../controllers/authController");

router.route('/register')
.post(registerRateLimit, register);


router.route("/login")
.post(login);

router.route("/verify")
.post(verify);


module.exports = router;

