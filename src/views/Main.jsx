import React, { useEffect, useState } from 'react';
import { fetchRnM } from '../services/fetch';

export default function Main() {
  const [char, setChar] = useState([]);
  const [living, setLiving] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const results = await fetchRnM();
      setChar(results);
    };
    fetchApi();
  }, []);

  return (
    <>
      <div>{/* <Order setOrder={setOrder} /> */}</div>
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
    </>
  );
}
