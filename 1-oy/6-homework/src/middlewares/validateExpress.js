const { body } = require("express-validator");

exports.emailCheck = body("email").isEmail();