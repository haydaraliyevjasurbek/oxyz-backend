# oxyz-backend

Express + Sequelize (PostgreSQL) backend.

## Requirements
- Node.js (LTS)
- PostgreSQL

## Setup
1. Install deps:
   - `npm install`
2. Create `.env` (example):
   - `PORT=3000`
   - `PGUSER=postgres`
   - `PGPASSWORD=...`
   - `PGDATABASE=...`
   - `PGHOST=127.0.0.1`
   - `PGPORT=5432`
   - `JWT_SECRET=change_me`
   - `ADMIN_LOGIN=...`
   - `ADMIN_PASSWORD=...`
3. Run migrations:
   - `npx sequelize db:migrate`

## Run
- Dev: `npm run dev`
- Prod: `npm start`

## Healthcheck
- `GET /health`
