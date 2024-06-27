import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import useFetch from './hooks/useFetch';
import { COUNTRIES_API_URL } from './constants/api';

afterEach(cleanup);

describe('Api testing', () => {
  it('should return 200 status for the api', async () => {
    const getError = new Error('network error');
    axios.get = jest.fn().mockRejectedValue(getError);
    const data = await axios(COUNTRIES_API_URL);
    expect(await data?.status).toEqual(200);
  });
  it('should return countries', async () => {
    const getError = new Error('network error');
    axios.get = jest.fn().mockRejectedValue(getError);
    const data = await axios(COUNTRIES_API_URL);
    expect(await data?.data[0]["abbreviation"]).toEqual('BD');

  });
});

test('renders main app component with country Info text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Country Info/i);
  expect(linkElement).toBeInTheDocument();
});
