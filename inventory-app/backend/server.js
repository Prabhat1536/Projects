const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();
// Connect to DB in the background
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Start the server immediately so Render sees it as "Healthy"
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on ${PORT}`);
});

// Init Middleware
app.use(cors());
app.use(express.json({ extended: false }));


// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

//const PORT = process.env.PORT || 5000;

//app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is ultra-live on port ${PORT}`);
});