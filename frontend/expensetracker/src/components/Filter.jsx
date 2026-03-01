import React from 'react'

const Filter = ({ filter, setFilter }) => {
  return (
    <select
      className="w-[60%] border border-gray-400 rounded-xl outline-none cursor-pointer p-2 mt-4"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option>All</option>
      <option>Food</option>
      <option>Travel</option>
      <option>Shopping</option>
      <option>Others</option>
    </select>
  );
};

export default Filter