require('dotenv').config();

function env(name, fallback) {
  return process.env[name] ?? fallback;
}

module.exports = {
  development: {
    username: env('PGUSER', 'postgres'),
    password: env('PGPASSWORD', ''),
    database: env('PGDATABASE', 'database_development'),
    host: env('PGHOST', '127.0.0.1'),
    port: Number(env('PGPORT', '5432')),
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: env('PGUSER', 'postgres'),
    password: env('PGPASSWORD', ''),
    database: env('PGDATABASE_TEST', 'database_test'),
    host: env('PGHOST', '127.0.0.1'),
    port: Number(env('PGPORT', '5432')),
    dialect: 'postgres',
    logging: false,
  },
  production: {
    username: env('PGUSER', 'postgres'),
    password: env('PGPASSWORD', ''),
    database: env('PGDATABASE_PROD', 'database_production'),
    host: env('PGHOST', '127.0.0.1'),
    port: Number(env('PGPORT', '5432')),
    dialect: 'postgres',
    logging: false,
  },
};
