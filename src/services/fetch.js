export async function fetchRnM() {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  const rickandm = await response.json();
  console.log(rickandm);
  return rickandm.results;
}
