# Short.To

A simple and good looking URL shortener.

## Getting started

- install all dependencies

  - `cd client && npm install`
  - `cd server && npm install`

- Configuration

  - Rename `.env.sample` to `.env` in the server folder and paste your mongodb URI
  - Change `client/config.js` where needed

- Starting
  - `cd client && npm run build`
  - `cd client && npm run start`
  - `cd server && npm start`

    Using pm2

    - `pm2 start server/src/index.js --name short-to-server`
    - `cd client && pm2 start npm --name short-to-client -- run serve`
