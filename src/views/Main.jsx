import React, { useEffect, useState } from 'react';
import Status from '../components/Status';
import { fetchRnM } from '../services/fetch';

export default function Main() {
  const [char, setChar] = useState([]);
  const [stat, setStat] = useState('Alive');
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      const results = await fetchRnM(stat);
      setChar(results);
      setLoad(false);

      // setTimeout(() => {
      //   setLoad(false);
      // }, 3000);
    };
    fetchApi();
  }, [stat]);

  if (load) return <h1>Loading</h1>;

  return (
    <>
      <div>
        <Status setStat={setStat} />
      </div>
      <>
        {char.map((item) => (
          <article key={item.id}>
            <div>
              <h1>
                Name: {item.name} ({item.status})
              </h1>
              <h3>
                Specifics: {item.gender} {item.species}
              </h3>
            </div>
          </article>
        ))}
      </>
    </>
  );
}
