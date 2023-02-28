import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex', () => {
  it('Testa se a página contém um heading com o texto "Encountered Pokémon"', () => {
    renderWithRouter(<App />);

    const homeTitle = screen.getByRole(
      'heading',
      { name: 'Encountered Pokémon' },
    );

    expect(homeTitle).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista quando o botão "Próximo Pokémon" é clicado', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    expect(nextButton).toBeInTheDocument();

    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();
    userEvent.click(nextButton);

    const charmanderText = screen.getByText('Charmander');
    expect(charmanderText).toBeInTheDocument();
    userEvent.click(nextButton);

    const caterpieText = screen.getByText('Caterpie');
    expect(caterpieText).toBeInTheDocument();
    userEvent.click(nextButton);

    const ekansText = screen.getByText('Ekans');
    expect(ekansText).toBeInTheDocument();
    userEvent.click(nextButton);

    const alakazamText = screen.getByText('Alakazam');
    expect(alakazamText).toBeInTheDocument();
    userEvent.click(nextButton);

    const mewText = screen.getByText('Mew');
    expect(mewText).toBeInTheDocument();
    userEvent.click(nextButton);

    const rapidashText = screen.getByText('Rapidash');
    expect(rapidashText).toBeInTheDocument();
    userEvent.click(nextButton);

    const snorlaxText = screen.getByText('Snorlax');
    expect(snorlaxText).toBeInTheDocument();
    userEvent.click(nextButton);

    const dragonairText = screen.getByText('Dragonair');
    expect(dragonairText).toBeInTheDocument();
    userEvent.click(nextButton);

    const pikachuText2 = screen.getByText('Pikachu');
    expect(pikachuText2).toBeInTheDocument();
  });

  it('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const pikachuText = screen.queryByText('Pikachu');
    const charmanderText = screen.queryByText('Charmander');
    const caterpieText = screen.queryByText('Caterpie');
    const ekansText = screen.queryByText('Ekans');
    const alakazamText = screen.queryByText('Alakazam');
    const mewText = screen.queryByText('Mew');
    const rapidashText = screen.queryByText('Rapidash');
    const snorlaxText = screen.queryByText('Snorlax');
    const dragonairText = screen.queryByText('Dragonair');

    expect(pikachuText).toBeInTheDocument();
    expect(charmanderText).not.toBeInTheDocument();
    expect(caterpieText).not.toBeInTheDocument();
    expect(ekansText).not.toBeInTheDocument();
    expect(alakazamText).not.toBeInTheDocument();
    expect(mewText).not.toBeInTheDocument();
    expect(rapidashText).not.toBeInTheDocument();
    expect(snorlaxText).not.toBeInTheDocument();
    expect(dragonairText).not.toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const typeArray = [];
    const expectedTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    typeButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      userEvent.click(button);
      const type = screen.getAllByText(button.innerHTML);
      expect(type).toHaveLength(2);
      const allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton).toBeInTheDocument();
      typeArray.push(button.innerHTML);
    });
    expect(typeArray).toEqual(expectedTypes);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const bugButton = screen.getByRole('button', { name: 'Bug' });
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();

    userEvent.click(bugButton);
    userEvent.click(allButton);
    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();
    userEvent.click(nextButton);

    const charmanderText = screen.getByText('Charmander');
    expect(charmanderText).toBeInTheDocument();
  });
});
