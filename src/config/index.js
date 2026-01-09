function env(name, fallback) {
  return process.env[name] ?? fallback;
}

module.exports = {
  PORT: Number(env('PORT', '3000')),
};
