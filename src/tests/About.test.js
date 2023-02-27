import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import About from '../pages/About';

describe('Testa o componente About', () => {
  it('Testa se a página contém o h2 com texto "About Pokédex"', () => {
    render(<About />);
    const aboutTitle = screen.getByRole(
      'heading',
      { name: 'About Pokédex' },
    );

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const aboutP1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const aboutP2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');

    expect(aboutP1).toBeInTheDocument();
    expect(aboutP2).toBeInTheDocument();
  });

  it('Testa se página contém a imagem de uma Pokédex', () => {
    render(<About />);

    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByAltText('Pokédex');

    expect(img).toHaveAttribute('src', imgSrc);
  });
});
