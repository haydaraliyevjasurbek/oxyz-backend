const express = require('express');

const { login } = require('../controllers/auth.controller');
const { createRateLimit } = require('../middlewares/rateLimit');

const router = express.Router();

// Basic brute-force protection for admin login
router.post('/login', createRateLimit({ windowMs: 60_000, max: 10 }), login);

module.exports = router;
