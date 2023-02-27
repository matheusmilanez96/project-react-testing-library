import React from 'react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const fav = 'Favorite Pokémon';

describe('Testa o componente App', () => {
  it('Verifica os links de navegação', () => {
    renderWithRouter(<App />);
    const navEl = screen.getByRole('navigation');

    expect(navEl).toBeInTheDocument();

    const homeLink = screen.getByRole('link', { name: 'Home' });
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const favoriteLink = screen.getByRole('link', { name: fav });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });

  it('Ao clicar em "Home" redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole(
      'heading',
      { name: 'Encountered Pokémon' },
    );

    expect(homeTitle).toBeInTheDocument();
  });

  it('Ao clicar em "About" redireciona para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole(
      'heading',
      { name: 'About Pokédex' },
    );

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Ao clicar em "Favorite Pokémon" redireciona para a rota "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: fav });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoriteTitle = screen.getByRole(
      'heading',
      { name: fav },
    );

    expect(favoriteTitle).toBeInTheDocument();
  });

  it('Renderiza o NotFound caso seja acessada uma rota inexistente', () => {
    const { history } = renderWithRouter(<App />);

    const INVALID_URL = '/invalid';
    act(() => {
      history.push(INVALID_URL);
    });

    const notFoundTitle = screen.getByRole(
      'heading',
      { name: 'Page requested not found' },
    );
    expect(notFoundTitle).toBeInTheDocument();
  });
});
