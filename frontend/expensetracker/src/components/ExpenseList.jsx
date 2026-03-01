import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuIndianRupee } from "react-icons/lu";

const ExpenseList = ({ expenses, deleteExpense }) => {
  if (expenses.length === 0) {
    return <p className="mt-4">No expenses found</p>;
  }

  return (
    <>
      <div className="mt-4 space-y-2">
        {expenses.map((exp) => (
          <div
            key={exp._id}
            className="flex justify-between w-[80%] border border-gray-400 rounded p-2"
          >
            <div className="">
              <p className="font-semibold">{exp.title}</p>
              <p>
                {exp.category} | {new Date(exp.date).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='flex items-center text-green-500 font-bold'>
                <LuIndianRupee /> {exp.amount}
              </p>
              <button
                onClick={() => deleteExpense(exp._id)}
                className="text-red-500 cursor-pointer"
              >
                <RiDeleteBin6Line size={20} className="hover:scale-120 transition-transform ease-in-out"/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ExpenseList