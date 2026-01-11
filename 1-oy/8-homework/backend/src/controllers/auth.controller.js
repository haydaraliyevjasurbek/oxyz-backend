const { signAdminToken } = require('../middlewares/auth');

function getAdminCreds() {
  return {
    login: process.env.ADMIN_LOGIN,
    password: process.env.ADMIN_PASSWORD,
  };
}

async function login(req, res) {
  const { login: userLogin, password } = req.body || {};

  const admin = getAdminCreds();

  if (userLogin !== admin.login || password !== admin.password) {
    return res.status(401).json({ message: 'parol noto‘g‘ri yoki login noto‘g‘ri' });
  }

  const token = signAdminToken();
  return res.json({ token });
}

module.exports = { login };
