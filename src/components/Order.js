import React from 'react';

export default function Order({ setOrder }) {
  return (
    <div>
      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Sort Name Ascending</option>
        <option value={'desc'}>Sort Name Descending</option>
      </select>
    </div>
  );
}
