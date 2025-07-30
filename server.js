// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images from public/images folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  dbName: 'ecommerce',
})
.then(() => console.log('MongoDB connected successfully!'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas and Models

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
});

const Product = mongoose.model('Product', productSchema);

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Authentication token required.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// Routes

// Auth Routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already registered.' });

    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Logged in successfully!', token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// Products Route
app.get('/api/products', async (req, res) => {
  const DUMMY_PRODUCTS = [
    { id: 'p1', name: 'Smartphone Pro', price: 69999, imageUrl: 'http://localhost:5000/images/smartphone-pro.jpeg' },
    { id: 'p2', name: 'Laptop Ultra', price: 99999, imageUrl: 'http://localhost:5000/images/laptop-ultra.jpeg' },
    { id: 'p3', name: 'Smartwatch X', price: 12999, imageUrl: 'http://localhost:5000/images/smartwatch-x.jpeg' },
    { id: 'p4', name: 'Wireless Earbuds', price: 4999, imageUrl: 'http://localhost:5000/images/wireless-earbuds.jpeg' },
    { id: 'p5', name: '4K Smart TV', price: 45999, imageUrl: 'http://localhost:5000/images/4k-smart-tv.jpeg' },
    { id: 'p6', name: 'Gaming Console', price: 35999, imageUrl: 'http://localhost:5000/images/gaming-console.jpeg' },
    { id: 'p7', name: 'Digital Camera', price: 28999, imageUrl: 'http://localhost:5000/images/digital-camera.jpeg' },
    { id: 'p8', name: 'Bluetooth Speaker', price: 3499, imageUrl: 'http://localhost:5000/images/bluetooth-speaker.jpeg' },
    { id: 'p9', name: 'Fitness Tracker', price: 2999, imageUrl: 'http://localhost:5000/images/fitness-tracker.jpeg' },
    { id: 'p10', name: 'External Hard Drive', price: 7999, imageUrl: 'http://localhost:5000/images/external-hard-drive.jpeg' },
    { id: 'p11', name: 'Robot Vacuum', price: 18999, imageUrl: 'http://localhost:5000/images/robot-vacuum.jpeg' },
    { id: 'p12', name: 'Coffee Maker', price: 5499, imageUrl: 'http://localhost:5000/images/coffee-maker.jpeg' }
  ];
  res.json(DUMMY_PRODUCTS);
});

// Cart Routes
app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { userId: req.user.id, items: [] });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error fetching cart.' });
  }
});

app.post('/api/cart', authenticateToken, async (req, res) => {
  const { productId, name, price, imageUrl, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existingIndex = cart.items.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      cart.items[existingIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ productId, name, price, imageUrl, quantity: quantity || 1 });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Add/Update cart item error:', error);
    res.status(500).json({ message: 'Server error adding/updating cart item.' });
  }
});

app.put('/api/cart/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart.' });
    }
  } catch (error) {
    console.error('Update cart item quantity error:', error);
    res.status(500).json({ message: 'Server error updating cart item quantity.' });
  }
});

app.delete('/api/cart/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found.' });

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.productId !== productId);

    if (cart.items.length === initialLength) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    await cart.save();
    res.json({ message: 'Item removed from cart.', cart });
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({ message: 'Server error removing cart item.' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
