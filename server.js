const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
  .then(() => console.log('DB connection succefull'))
  .catch((error) => console.log(error));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}, listening ...`);
});
