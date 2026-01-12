const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
dotenv.config({ quiet: true });

const app = require('./src/app');
const db = require('./src/models');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await db.sequelize.authenticate();
    console.log('DB unaldi');

    app.listen(PORT, () => {
      if (process.env.RENDER) {
        console.log(`Server ishlamoqda: Render port ${PORT}`);
      } else {
        console.log(`Server ishlamoqda http://localhost:${PORT}`);
      }
    });
  } catch (err) {
    console.error('Boshlashda xatolik yuz berdi:', err);
    process.exit(1);
  }
}

start();
