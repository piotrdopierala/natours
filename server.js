const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(' --- UNCAUGHT EXCEPTION, SHUTTING DOWN ... ---');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({
  path: './config.env',
});

const app = require('./app');

const DB_CONNECTION_STRING = process.env.DB_CLOUD.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection succefull'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server started on port ${port}, listening ...`);
});

process.on('unhandledRejection', (err) => {
  console.log('--- UNHANDELED REJECTION, SHUTTING DOWN ... ---');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
