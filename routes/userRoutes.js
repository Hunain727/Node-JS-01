const express = require('express');
const router = express.Router();
let { users } = require('../config/dummyData');
const apiKeyAuth = require('../middleware/auth');
const { validateUser } = require('../middleware/validation');

// 1. GET All Users (Public)
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  });
});

// 2. GET Single User (Public)
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  res.status(200).json({ success: true, data: user });
});

// 3. POST Add User (Protected + Validated)
router.post('/', apiKeyAuth, validateUser, (req, res) => {
  const { name, email, role } = req.body;
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name,
    email,
    role
  };

  users.push(newUser);
  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: newUser
  });
});

// 4. PUT Update User (Protected + Validated)
router.put('/:id', apiKeyAuth, validateUser, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const { name, email, role } = req.body;
  users[index] = { id, name, email, role };

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: users[index]
  });
});

// 5. DELETE User (Protected)
router.delete('/:id', apiKeyAuth, (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const deletedUser = users.splice(index, 1);
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
    data: deletedUser[0]
  });
});

module.exports = router;