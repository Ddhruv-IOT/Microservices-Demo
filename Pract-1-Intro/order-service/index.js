const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const orders = [];

// Create new order by calling User & Product services
app.post('/orders', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userRes = await axios.get(`http://localhost:3001/users/${userId}`);
    const productRes = await axios.get(`http://localhost:3002/products/${productId}`);

    const order = {
      orderId: orders.length + 1,
      user: userRes.data,
      product: productRes.data,
      status: 'confirmed'
    };

    orders.push(order);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }
});

// Get all orders
app.get('/orders', (req, res) => {
  res.json(orders);
});

app.get('/orders/:id', (req, res) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(p => p.orderId === orderId);
  order ? res.json(order) : res.status(404).json({ message: 'Orders not found' });
});

app.get('/ordersc/:status', (req, res) => {
  const order1 = orders.filter(p => p.status === req.params.status);
  res.send(order1)
});

app.get('/ordername/:name', (req, res) => {
  const order1 = orders.filter(p => p.user.name === req.params.name);
  res.send(order1)
});

app.listen(3003, () => {
  console.log('Order Service running on port 3003');
});
