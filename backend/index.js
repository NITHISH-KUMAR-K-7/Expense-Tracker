import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authExpense from './routes/expenseRoutes.js'

dotenv.config();
connectDB()


const app = express();
app.use(cors({
  origin:"https://expense-tracker-vert-seven-26.vercel.app",
}));
app.use(express.json());

app.use('/api/expense',authExpense)




app.listen(process.env.PORT, () =>
  console.log("Server Running")
);