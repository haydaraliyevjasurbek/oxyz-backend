const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });
dotenv.config();

function env(name, fallback) {
  return process.env[name] ?? fallback;
}

function needsSsl() {
  const sslmode = (process.env.PGSSLMODE || '').toLowerCase();
  return sslmode === 'require' || sslmode === 'verify-ca' || sslmode === 'verify-full';
}

function postgresSslOptions() {
  if (!needsSsl()) return undefined;
  return {
    require: true,
    // Render uses publicly trusted certs, but many clients work best with this off in dev.
    // If you want strict verification, set PGSSLMODE=verify-full and add proper CA.
    rejectUnauthorized: false,
  };
}

function baseConfig(extra = {}) {
  const ssl = postgresSslOptions();
  const dialectOptions = ssl ? { ssl } : undefined;
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl && typeof databaseUrl === 'string' && databaseUrl.length > 0) {
    return {
      use_env_variable: 'DATABASE_URL',
      dialect: 'postgres',
      logging: false,
      dialectOptions,
      ...extra,
    };
  }

  return {
    username: env('PGUSER', 'postgres'),
    password: env('PGPASSWORD', ''),
    database: env('PGDATABASE', 'database_development'),
    host: env('PGHOST', '127.0.0.1'),
    port: Number(env('PGPORT', '5432')),
    dialect: 'postgres',
    logging: false,
    dialectOptions,
    ...extra,
  };
}

module.exports = {
  development: baseConfig(),
  test: baseConfig({
    database: env('PGDATABASE_TEST', 'database_test'),
  }),
  production: baseConfig({
    database: env('PGDATABASE_PROD', 'database_production'),
  }),
};
