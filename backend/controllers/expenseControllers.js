import express from 'express'
import Expense from '../model/expenseModel.js'


// add expense

export const createExpense = async(req,res)=>{
   
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const expense = await Expense.create({ title, amount, category, date });
    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }

}

export const getExpense =  async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
}



 
export const DeleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};