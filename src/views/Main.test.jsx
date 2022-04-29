import { screen, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Main from './Main';

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
      res(ctx.json(firstTest));
    }
  ),
  rest.get(
    `https://rickandmortyapi.com/api/character/?status=dead`,
    (req, res, ctx) => res(ctx.json(firstTest))
  )
);
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Does this render rick?', () => {
  it('Rendering Rick Sanchez', async () => {
    render(<App />);
    screen.getByText(/loading/i);
    const nameChar = await screen.findByText('Name: Rick Sanchez (Alive)');
    expect(nameChar).toBeInTheDocument();
  });
});

// server.use(
//   `https://rickandmortyapi.com/api/character/?status=alive`,
//   (req, res, ctx) => {
//     res(ctx.json(firstTest));
//   }
// ),
//   server.use(
//     `https://rickandmortyapi.com/api/character/?status=dead`,
//     (req, res, ctx) => res(ctx.json(firstTest))
//   );

// beforeAll(() => server.listen());
// afterAll(() => server.close());

// describe('behavioural test ', () => {
//   it('testing the clicks', async () => {
//     render(<App />);
//     screen.getByText(/loading/i);

//     screen.debug();
//     const selectDom = await screen.findByRole('article');
//     userEvent.click(selectDom);

//     const pickDead = screen.getByText('dead');
//     userEvent.click(pickDead);

//     const result = await screen.findByText('Name: Adjudicator Rick (Dead)');
//     expect(result).toBeInTheDocument();
//   });
// });

// Adjudicator Rick (Dead)

const secondTest = {
  results: [
    {
      id: 1,
      name: 'Adjudicator Rick',
      status: 'Dead',
      gender: 'Male',
      species: 'Human',
    },
  ],
};

describe('Selector', () => {
  it('Select Test', async () => {
    render(<Main />);

    screen.getByText(/loading/i);
    screen.debug();

    await waitFor(
      async () => {
        userEvent.selectOptions(
          screen.getByRole('combobox'),
          'Dead'
          // screen.getByRole('option', { name: 'testDead' })
        );
        server.use(
          rest.get(
            `https://rickandmortyapi.com/api/character/?status=dead`,
            (req, res, ctx) => res(ctx.json(secondTest))
          )
        );
        const name = await screen.findByText('Name: Adjudicator Rick (Dead)');
        // const heading = await screen.findByRole('heading');
        // console.log(name.textContent);
        expect(name).toBeInTheDocument();
      },

      { timeout: 3000 }
    );
    // expect(secondTest.name).toBeInTheDocument();
  });
});

// it('should allow user to change country', () => {
//   render(<App />);
//   userEvent.selectOptions(
//     // Find the select element
//     screen.getByRole('combobox'),
//     // Find and select the Ireland option
//     screen.getByRole('option', { name: 'Ireland' })
//   );
//   expect(screen.getByRole('option', { name: 'Ireland' }).selected).toBe(true);
// });
