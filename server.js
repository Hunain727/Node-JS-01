require('dotenv').config();
const express = require('express');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());

// Routes Setup
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('E-Commerce Backend REST API is running...');
});

// Global 404 Route Handling
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route Not Found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});