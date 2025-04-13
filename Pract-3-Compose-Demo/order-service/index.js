const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const orders = [];

// Create new order by calling User & Product services
app.post('/orders', async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userRes = await axios.get(`http://host.docker.internal:3001/users/${userId}`);
    const productRes = await axios.get(`http://host.docker.internal:3002/products/${productId}`);

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

app.listen(3003, () => {
  console.log('Order Service running on port 3003');
});
