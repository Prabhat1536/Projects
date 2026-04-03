const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'General' },
  quantity: { type: Number, required: true, default: 0 },
  minThreshold: { type: Number, default: 10 },
  avgDailyUsage: { type: Number, default: 0 }, // Based on sales history
  unitPrice: { type: Number, required: true },
  supplier: String,
  updatedAt: { type: Date, default: Date.now }
});

// Predictive Logic: Virtual field to calculate days remaining
ItemSchema.virtual('daysUntilEmpty').get(function() {
  if (this.avgDailyUsage <= 0) return 999; 
  return Math.floor(this.quantity / this.avgDailyUsage);
});

module.exports = mongoose.model('Item', ItemSchema);