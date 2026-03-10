import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";
import Filter from "./Filter";
import { LuIndianRupee } from "react-icons/lu";



const Home = () => {

    const API = import.meta.env.VITE_API_URL;

    const [expenses, setExpenses] = useState([]);
    const [filter, setFilter] = useState("All");

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${API}/api/expense`);
        setExpenses(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch expenses.");
      }
    };


    useEffect(() => {
      fetchExpenses();
    }, []);

    const addExpense = async (data) => {
      try {
        const res = await axios.post(`${API}/api/expense`, data);
        setExpenses([res.data, ...expenses]);
        toast.success("Expense added successfully!"); // Success toast
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Failed to add expense."); // Error toast
      }
    };

    const deleteExpense = async (id) => {
      await axios.delete(`${API}/api/expense/${id}`);
      setExpenses(expenses.filter((exp) => exp._id !== id));
    };

    const filteredExpenses =
      filter === "All"
        ? expenses
        : expenses.filter((exp) => exp.category === filter);

    const totalAmount = filteredExpenses.reduce(
      (acc, curr) => acc + curr.amount,
      0,
    );

  return (
    <>
      {/*  ToastContainer only once */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <div className="grid grid-cols-2 min-h-screen gap-5 bg-gray-100">
        <div className="mt-10">
          <h1 className="text-2xl text-center font-bold">Expense Tracker</h1>

          <ExpenseForm addExpense={addExpense} />
        </div>

        <div className="mt-10 p-2 ">
          <div className="flex flex-col ml-5">
            <Filter filter={filter} setFilter={setFilter} />

            <h2 className="text-lg font-bold mt-4 flex items-center">
              Total: <LuIndianRupee /> {totalAmount}
            </h2>
          </div>
          <div className="flex flex-col ml-15">
            <ExpenseList
              expenses={filteredExpenses}
              deleteExpense={deleteExpense}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
