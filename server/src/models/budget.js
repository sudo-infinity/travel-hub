const { Schema, model } = require('mongoose');

const requiredNumber = {
  type: Number,
  required: true,
};

const requiredString = {
  type: String,
  required: true,
  trim: true,
};

const budgetSchema = new Schema({
  total: {
    ...requiredNumber,
  },
  currency: requiredString,
  categories: {
    accommodation: requiredNumber,
    food: requiredNumber,
    activities: requiredNumber,
    transportation: requiredNumber,
  },
});

const budget = model('budget', budgetSchema);

module.exports = budget;
