import { screen, render } from '@testing-library/react';
import Status from './Status';
import { MemoryRouter } from 'react-router-dom';

describe('drop down test', () => {
  it('testing drop down selector', async () => {
    render(
      <MemoryRouter>
        <Status />
      </MemoryRouter>
    );
    screen.debug();

    const test = screen.getByText('Sort by Alive');
    expect(test).toBeInTheDocument();

    const test2 = screen.getByText('Sort by Dead');
    expect(test2).toBeInTheDocument();
  });
});
