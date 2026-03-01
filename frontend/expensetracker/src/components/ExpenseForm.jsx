import React,{useState} from 'react'


const ExpenseForm = ({addExpense}) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) newErrors.title = "Title is required";

    if (!form.amount || form.amount <= 0)
      newErrors.amount = "Amount must be greater than 0";

    if (!form.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    addExpense({
      ...form,
      amount: Number(form.amount),
    });

    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: "",
    });
  };
  return (
    <>
      <div className="flex justify-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="w-[60%] bg-gray-200 rounded-xl p-5 space-y-3"
        >
          <input
            type="text"
            placeholder="Title"
            className="w-full border-gray-500 bg-gray-50 outline-none rounded p-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}

          <input
            type="number"
            placeholder="Amount"
            className="w-full border-gray-500 bg-gray-50 outline-none rounded p-2"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}

          <select
            className="w-full border-gray-500 bg-gray-50 outline-none rounded p-2"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Others</option>
          </select>

          <input
            type="date"
            className="w-full border-gray-500 bg-gray-50 outline-none rounded p-2"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          {errors.date && <p className="text-red-500">{errors.date}</p>}

          <button
            type="submit"
            className="bg-blue-500 text-white rounded cursor-pointer px-4 py-2 hover:bg-blue-700"
          >
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default ExpenseForm