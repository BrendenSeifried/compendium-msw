import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Main from './Main';

const firstTest = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  gender: 'Male',
  species: 'Human',
};

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) =>
    res(ctx.json([firstTest]))
  )
);

beforeAll(() => server.listen());
afterAll(() => server.close);

test('Rendering Rick Sanchez', async () => {
  render(<Main />);
  const nameChar = await screen.findByText('Rick Sanchez');
  expect(nameChar).toBeInTheDocument();
});

// test('Should grab the name Rick', async () => {
//   const secondTest = {
//     id: 1,
//     name: 'Rick Sanchez',
//     status: 'Alive',
//     gender: 'Male',
//     species: 'Human',
//   };
//   server.use(
//     rest.get('https://rickandmortyapi.com/api/character/1', (req, res, ctx) =>
//       res(ctx.json([secondTest]))
//     )
//   );

//   render(<Main />);
//   const result = await screen.findByText(secondTest.name);
//   expect(result).toBeInTheDocument();
// });
