function createRateLimit({ windowMs, max, keyGenerator } = {}) {
  const winMs = typeof windowMs === 'number' ? windowMs : 60_000;
  const limit = typeof max === 'number' ? max : 20;
  const getKey = typeof keyGenerator === 'function'
    ? keyGenerator
    : (req) => String((req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'));

  const hits = new Map();

  return function rateLimit(req, res, next) {
    const now = Date.now();
    const key = getKey(req);

    const record = hits.get(key);
    if (!record || now - record.start > winMs) {
      hits.set(key, { start: now, count: 1 });
      return next();
    }

    record.count += 1;
    if (record.count > limit) {
      const retryAfterSec = Math.ceil((winMs - (now - record.start)) / 1000);
      res.setHeader('Retry-After', String(retryAfterSec));
      return res.status(429).json({ message: 'Too many requests' });
    }

    return next();
  };
}

module.exports = { createRateLimit };
