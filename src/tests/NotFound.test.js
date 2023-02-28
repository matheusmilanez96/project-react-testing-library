import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

const notFoundText = 'Page requested not found';

describe('Testa o componente NotFound', () => {
  it('Testa se a página contém um heading com o texto necessário', () => {
    render(<NotFound />);

    const notFoundEl = screen.getByRole(
      'heading',
      { name: notFoundText },
    );

    expect(notFoundEl).toBeInTheDocument();
  });

  it('Testa se a página mostra a imagem necessária', () => {
    render(<NotFound />);

    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const img = screen.getByAltText('Pikachu crying because the page requested was not found');

    expect(img).toHaveAttribute('src', imgSrc);
  });
});
