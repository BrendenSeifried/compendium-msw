import React, { useEffect } from 'react';
import { fetchRnM } from '../services/fetch';

export default function Main() {
  useEffect(() => {
    const fetchApi = async () => {
      const test = await fetchRnM();
      //   setInfo(allApi);
      console.log(test);
    };
    fetchApi();
  }, []);
  return <div>Main</div>;
}
