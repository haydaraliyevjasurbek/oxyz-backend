const bcrypt = require("bcrypt");
const userService = require("../services/user.service");
const { signToken } = require("../utils/jwt");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (userService.findByEmail(email)) {
    return res.status(409).json({ message: "Bunday foydalanuvchi allaqachon mavjud" });
  }

  const hashed = await bcrypt.hash(password, 10);
  userService.createUser({ email, password: hashed });

  res.status(201).json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = userService.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Parol noto'g'ri" });
  }

  const token = signToken({ email });
  res.json({ token });
};

exports.profile = (req, res) => {
  res.json({ user: req.user });
};
