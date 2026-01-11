const users = require("../models/user.model");

exports.createUser = (user) => {
  users.push(user);
  return user;
};

exports.findByEmail = (email) =>
  users.find((u) => u.email === email);