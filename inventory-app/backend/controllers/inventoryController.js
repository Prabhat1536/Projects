const Product = require('../models/Product');

// 1. Get all inventory (with predictive logic)
exports.getInventory = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user.id });

    const analyzedProducts = products.map(product => {
      const p = product.toObject();
      const totalSales = p.salesHistory.reduce((acc, curr) => acc + curr, 0);
      const avgUsage = totalSales / (p.salesHistory.length || 1);
      
      p.calculatedAvgUsage = avgUsage.toFixed(1);
      p.daysUntilOut = avgUsage > 0 ? Math.floor(p.currentStock / avgUsage) : 999;

      if (p.currentStock <= p.minStockLevel) {
        p.forecastAction = "Safety Stock Breached";
        p.urgent = true;
      } else if (p.daysUntilOut <= 3) {
        p.forecastAction = "Critical: 3 Days Left";
        p.urgent = true;
      } else if (p.daysUntilOut <= 7) {
        p.forecastAction = "Restock Suggested";
        p.urgent = false;
      } else {
        p.forecastAction = "Stock Stable";
        p.urgent = false;
      }
      return p;
    });

    res.json(analyzedProducts);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Add a product
exports.addProduct = async (req, res) => {
  try {
    const productData = { ...req.body, user: req.user.id };
    const newProduct = new Product(productData);
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message || "Invalid product data" });
  }
};

// 3. Update a product (Critical for the Sales tab)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { 
        // Change 'new: true' to this:
        returnDocument: 'after', 
        runValidators: true 
      }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

// 4. Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};