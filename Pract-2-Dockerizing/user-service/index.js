const express = require('express');
const app = express();
app.use(express.json());

const users = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' }
];

// Add new user
app.post('/users', (req, res) => {
  const { id, name } = req.body;
  users.push({ id, name });
  res.status(201).json({ message: 'User added' });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

app.listen(3001, () => {
  console.log('User Service running on port 3001');
});
