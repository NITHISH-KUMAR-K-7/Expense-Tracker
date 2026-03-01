import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
    enum: ["Food", "Travel", "Shopping", "Others"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Expense", expenseSchema);