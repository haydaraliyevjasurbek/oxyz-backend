// DELETE /users/:id
exports.deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  writeUsers(users);
  res.json({ message: "User deleted", user: deletedUser });
};
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db/users.json");

function readUsers() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2), "utf-8");
}

// GET /users
exports.getUsers = (req, res) => {
  const users = readUsers();
  res.json(users);
};

// GET /users/:id
exports.getUserById = (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// POST /users
exports.createUser = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const users = readUsers();
  const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    name
  };

  users.push(newUser);
  writeUsers(users);
  res.status(201).json(newUser);
};
