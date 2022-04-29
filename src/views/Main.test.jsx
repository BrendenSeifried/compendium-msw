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
        userEvent.selectOptions(screen.getByRole('combobox'), 'Dead');
        server.use(
          rest.get(
            `https://rickandmortyapi.com/api/character/?status=dead`,
            (req, res, ctx) => res(ctx.json(secondTest))
          )
        );
        const name = await screen.findByText('Name: Adjudicator Rick (Dead)');
        expect(name).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
