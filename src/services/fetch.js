export async function fetchRnM(setLiving) {
  const response = await fetch(
    'https://rickandmortyapi.com/api/character?status=alive'
  );
  const rickandm = await response.json();
  console.log(rickandm);
  return rickandm.results;
}
