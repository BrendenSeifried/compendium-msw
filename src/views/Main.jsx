import React, { useEffect, useState } from 'react';
import { fetchRnM } from '../services/fetch';

export default function Main() {
  const [char, setChar] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const results = await fetchRnM();
      // console.log(allChar);
      setChar(results);
    };
    fetchApi();
  }, []);

  return (
    <>
      {char.map((item) => (
        <article key={item.id}>
          <div>
            <h1>Name: {item.name}</h1>
            <p>Status: ({item.status})</p>
          </div>
        </article>
      ))}
    </>
  );
}
