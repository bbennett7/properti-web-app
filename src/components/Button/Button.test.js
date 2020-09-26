import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

describe('button component', () => {
  test('renders a link when path prop is present', () => {
    const pathProp = '/test-path';
    const textProp = 'Test Page Name';
    
    // React-Testing-Library
    render(
      <Router>
        <Button path={pathProp} text={textProp} />
      </Router>
    );
  
    const btn = screen.getByText(textProp);

    // Jest
    expect(btn).toHaveProperty('href');
    expect(btn.href).toContain(pathProp);
  });

  test('renders a button element when path prop is absent', () => {
    const btnText = 'Test Button';

    // React-Testing-Library
    render( <Button text={btnText} />);

    const btn = screen.getByText(btnText);

    // Jest
    expect(btn).not.toHaveProperty('href');

   // Jest-DOM
   expect(btn).toContainHTML('<button ')
  })
})



