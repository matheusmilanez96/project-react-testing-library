import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente PokemonDetails', () => {
  it('Testes para o componente PokemonDetails', () => {
    renderWithRouter(<App />);

    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    userEvent.click(poisonButton);
    const ekansDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(ekansDetails);

    const ekansTitle = screen.getByRole('heading', { name: 'Ekans Details' });
    expect(ekansTitle).toBeInTheDocument();

    const details = screen.queryByRole('link', { name: 'More details' });
    expect(details).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryHeading).toBeInTheDocument();

    const ekansSummary = screen.getByText('It can freely detach its jaw to swallow large prey whole. It can become too heavy to move, however.');
    expect(ekansSummary).toBeInTheDocument();

    const locationsHeading = screen.getByRole('heading', { name: 'Game Locations of Ekans' });
    expect(locationsHeading).toBeInTheDocument();

    const ekansLocation = screen.getByText('Goldenrod Game Corner');
    expect(ekansLocation).toBeInTheDocument();

    const ekansSrc = 'https://archives.bulbagarden.net/media/upload/e/ec/Johto_Goldenrod_City_Map.png';
    const ekansImg = screen.getByAltText('Ekans location');
    expect(ekansImg).toHaveAttribute('src', ekansSrc);

    const favCheck = screen.getByRole('checkbox');
    expect(favCheck).toBeInTheDocument();

    userEvent.click(favCheck);
    const favImg = screen.queryByAltText('Ekans is marked as favorite');
    expect(favImg).toBeInTheDocument();

    userEvent.click(favCheck);
    const favImg2 = screen.queryByAltText('Ekans is marked as favorite');
    expect(favImg2).not.toBeInTheDocument();

    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeInTheDocument();
  });
});
