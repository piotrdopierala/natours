const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

dotenv.config({
  path: '../../config.env',
});

const DB_CONNECTION_STRING = process.env.DB_CLOUD.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

const mongoConnectPro = mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection succefull'))
  .catch((error) => console.log(error));

const importData = async () => {
  const fileData = fs.readFileSync(`${__dirname}/tours-simple.json`);
  await Tour.create(JSON.parse(fileData))
    .then((val) => console.log('SUCCESS!'))
    .catch((err) => console.log('ERROR\n', err.message))
    .finally(() => mongoose.disconnect());
};

//DELETE DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Data removed succesfully.');
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

mongoConnectPro.then(() => {
  switch (process.argv[2]) {
    case '--import':
      importData();
      break;
    case '--delete':
      deleteData();
      break;
    default:
      console.log('Enter correct command --import or --delete');
      mongoose.disconnect();
  }
});
