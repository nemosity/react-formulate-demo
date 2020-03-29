import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux'
import App from './App';

import configureStore from './store/configureStore';
const store = configureStore();

test('renders React Formulate demo', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const text = getByText(/React Formulate/i);
  expect(text).toBeInTheDocument();
});
