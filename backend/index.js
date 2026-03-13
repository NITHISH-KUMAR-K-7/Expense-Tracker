import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authExpense from "./routes/expenseRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Allowed origins (dev + prod)
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-vert-seven-26.vercel.app"
];

console.log("Allowed origins:", allowedOrigins);

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin && process.env.NODE_ENV !== "production") {
      return callback(null, true);
    }
    if (origin && allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.log("Blocked by CORS:", origin);
    callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


// Handle preflight for all routes
// app.options("*", cors({
//   origin: allowedOrigins,
//   credentials: true
// }));

// Parse JSON body
app.use(express.json());

// Routes
app.use("/api/expense", authExpense);

// Catch-all error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

// const PORT =  5000; //for development time use this

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));