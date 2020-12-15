const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users: users,
    },
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "method not implemented",
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "method not implemented",
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "method not implemented",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "method not implemented",
  });
};
