require('dotenv').config();

const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('DB unaldi');

    app.listen(PORT, () => {
      console.log(`Server ishlamoqda http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Boshlashda xatolik yuz berdi:', err);
    process.exit(1);
  }
}

start();
