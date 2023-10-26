const {Router} = require('express');

const router = Router();

const { register, login, verify } = require("../controllers/authController");

router.route('/register')
.post(register);


router.route("/login")
.post(login);

router.route("/verify")
.post(verify);


module.exports = router;

