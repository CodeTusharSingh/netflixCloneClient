import React from 'react';
import ErrorPage from './ErrorPage';
import { render, screen } from '@testing-library/react';

test('renders the ErrorPage component with the correct message', () => {
    render(<ErrorPage />);

    const errorPageMessage = screen.getByRole('heading', { name: 'Lost your way?' });
    expect(errorPageMessage).toBeInTheDocument();

    const errorMessageParagraph = screen.getByText('Sorry we can\'t find that page. You\'ll find loads to explore on the home page.');
    expect(errorMessageParagraph).toBeInTheDocument();

    const homePageLink = screen.getByRole('link', { name: 'Netflix Home' });
    expect(homePageLink).toBeInTheDocument();
    expect(homePageLink).toHaveAttribute('href', '/');
});
