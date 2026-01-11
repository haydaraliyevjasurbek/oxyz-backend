const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const validateBody = require("../middlewares/validateBody");
const { emailCheck } = require("../middlewares/validateExpress");
const { registerSchema, loginSchema } = require("../validations/auth.joi");
const auth = require("../middlewares/auth.middleware");

router.post(
  "/register",
  emailCheck,
  validateBody(registerSchema),
  controller.register
);

router.post(
  "/login",
  validateBody(loginSchema),
  controller.login
);

router.get("/profile", auth, controller.profile);

module.exports = router;
