export async function fetchRnM(setLife) {
  const status = new URLSearchParams();
  status.set('status', setLife);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?${status.toString()}`
  );
  const rickandm = await response.json();
  console.log(rickandm);
  return rickandm.results;
}
