import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const fav = 'Favorite Pokémon';

describe('Testa o componente FavoritePokemon', () => {
  it('Testa se é exibida a mensagem caso a pessoa não tenha Pokémon favoritos', () => {
    render(<FavoritePokemon />);

    const notFoundText = screen.getByText('No favorite Pokémon found');

    expect(notFoundText).toBeInTheDocument();
  });
  it('Testa se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const fireButton = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireButton);
    const charmanderText = screen.getByText('Charmander');
    expect(charmanderText).toBeInTheDocument();

    const charmanderDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(charmanderDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/4');

    const charmanderCheck = screen.getByRole('checkbox');
    userEvent.click(charmanderCheck);

    const favoriteLink = screen.getByRole('link', { name: fav });
    userEvent.click(favoriteLink);

    const favoriteTitle = screen.getByRole(
      'heading',
      { name: fav },
    );
    expect(favoriteTitle).toBeInTheDocument();

    const charmanderText2 = screen.getByText('Charmander');
    expect(charmanderText2).toBeInTheDocument();
    const pikachuText = screen.queryByText('Pikachu');
    expect(pikachuText).not.toBeInTheDocument();
  });
});
