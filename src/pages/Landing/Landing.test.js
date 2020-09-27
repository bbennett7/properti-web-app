import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import Landing from './Landing';

describe('Landing page', () => {
  const wrapper = mount((
    <Router>
      <Landing />
    </Router>
  ));

  const authButtons = wrapper.find('a.button');

  it('properly renders the sign up button', () => {
    const signUp = authButtons.at(0);

    expect(signUp.props().href).toEqual('/signup')
    expect(signUp.html()).toContain('Sign Up')
  })

  it('properly renders the sign in button', () => {
    const signIn = authButtons.at(1);

    expect(signIn.props().href).toEqual('/signin')
    expect(signIn.html()).toContain('Sign In')
  })
})

