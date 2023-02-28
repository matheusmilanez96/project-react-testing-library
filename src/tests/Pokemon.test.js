import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('Testes para o componente Pokedex', () => {
    const { history } = renderWithRouter(<App />);

    const dragonButton = screen.getByRole('button', { name: 'Dragon' });
    userEvent.click(dragonButton);

    const dragonairText = screen.getByText('Dragonair');
    expect(dragonairText).toBeInTheDocument();
    const dragonText = screen.getAllByText('Dragon');
    expect(dragonText).toHaveLength(2);
    const dragonairWeight = screen.getByText('Average weight: 16.5 kg');
    expect(dragonairWeight).toBeInTheDocument();
    const dragonairSrc = 'https://archives.bulbagarden.net/media/upload/2/2c/Spr_5b_148.png';
    const dragonairImg = screen.getByAltText('Dragonair sprite');
    expect(dragonairImg).toHaveAttribute('src', dragonairSrc);

    const dragonairDetails = screen.getByRole('link', { name: 'More details' });
    expect(dragonairDetails.href).toContain('pokemon/148');
    userEvent.click(dragonairDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/148');

    const dragonairCheck = screen.getByRole('checkbox');
    userEvent.click(dragonairCheck);

    const favSrc = '/star-icon.svg';
    const favImg = screen.getByAltText('Dragonair is marked as favorite');
    expect(favImg).toHaveAttribute('src', favSrc);
  });
});
