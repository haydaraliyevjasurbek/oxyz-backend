const jwt = require('jsonwebtoken');

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || typeof secret !== 'string') {
    throw new Error('JWT_SECRET is not set');
  }
  return secret;
}

function signAdminToken() {
  return jwt.sign(
    { role: 'admin' },
    getJwtSecret(),
    { expiresIn: Number(process.env.TEKON_TIME) }
  );
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header || typeof header !== 'string') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    req.user = payload;
    return next();
  } catch (err) {
    if (err && err.message === 'JWT_SECRET is not set') {
      return res.status(500).json({ message: 'Server misconfigured' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = {
  signAdminToken,
  requireAuth,
};
