import { screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Main from './Main';
import App from '../App';

const firstTest = {
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      gender: 'Male',
      species: 'Human',
    },
  ],
};
const server = setupServer(
  rest.get(
    `https://rickandmortyapi.com/api/character/?status=alive`,
    (req, res, ctx) => {
      // const data = req.url.searchParams.get('');
      res(ctx.json(firstTest));
    }
  ),
  rest.get(
    `https://rickandmortyapi.com/api/character/?status=dead`,
    (req, res, ctx) => res(ctx.json(firstTest))
  )
);
beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('This is render rick?', () => {
  it('Rendering Rick Sanchez', async () => {
    render(<App />);
    screen.getByText(/loading/i);
    // const nameChar = await screen.findByText(firstTest.name, {
    //   timeout: 4000,
    // });
    const nameChar = await screen.findByText('Name: Rick Sanchez (Alive)');
    expect(nameChar).toBeInTheDocument();
    screen.debug();
  });
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
