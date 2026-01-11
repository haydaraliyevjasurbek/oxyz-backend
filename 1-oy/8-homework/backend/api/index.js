// Vercel Serverless Function entrypoint
// Exporting the Express app works because it has the (req, res) handler signature.

const app = require('../src/app');

module.exports = app;
