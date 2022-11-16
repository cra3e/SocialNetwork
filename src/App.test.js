import { render, screen } from '@testing-library/react';
import MainApp from "./App";

test('renders without crashing', () => {
  render(<MainApp />);
});


/*import React from 'react';
import ReactDOM from 'react-dom';
import SamuraiJSApp from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SamuraiJSApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/
