// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
// });

// App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

test('renders App component', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  // You can add assertions based on your component's behavior or structure
  // For example:
  // expect(screen.getByText('Some Text')).toBeInTheDocument();
});
