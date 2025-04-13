const express = require('express');
const app = express();
app.use(express.json());

const products = [
  { id: '101', name: 'Laptop' },
  { id: '102', name: 'Phone' }
];

// Add new product
app.post('/products', (req, res) => {
  const { id, name } = req.body;
  products.push({ id, name });
  res.status(201).json({ message: 'Product added' });
});

// Get product by ID
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
});

app.listen(3002, () => {
  console.log('Product Service running on port 3002');
});
