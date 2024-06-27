import React from 'react';
import { render, screen, cleanup, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios';
import useFetch from './hooks/useFetch';
import { COUNTRIES_API_URL } from './constants/api';
import CountriesTable from './components/CountryList';

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


test('Should retrive table data when clicked on show countries button', async () => {
  const mockData = [
    {
      name: 'Country 1',
      abbreviation: 'C1',
      capital: 'Capital 1',
      phone: '123',
      population: 1000000,
      media: {
        flag: 'country1-flag.jpg',
        emblem: 'country1-emblem.jpg',
      },
    },
    {
      name: 'Country 2',
      abbreviation: 'C2',
      capital: 'Capital 2',
      phone: '456',
      population: 2000000,
      media: {
        flag: 'country2-flag.jpg',
        emblem: 'country2-emblem.jpg',
      },
    },
  ];
  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: mockData,
  });
  render(<App />);
  const clearButton = screen.getByTestId('show-btn');
  fireEvent.click(clearButton);
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).toBeNull();
    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.getByText('Country 2')).toBeInTheDocument();
  });
});



test('Should show filtered values when searched for countries', async () => {
  const mockData = [
    {
      name: 'Country 1',
      abbreviation: 'C1',
      capital: 'Capital 1',
      phone: '123',
      population: 1000000,
      media: {
        flag: 'country1-flag.jpg',
        emblem: 'country1-emblem.jpg',
      },
    },
    {
      name: 'Country 2',
      abbreviation: 'C2',
      capital: 'Capital 2',
      phone: '456',
      population: 2000000,
      media: {
        flag: 'country2-flag.jpg',
        emblem: 'country2-emblem.jpg',
      },
    },
  ];

  (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
    data: mockData,
  });


  render(<CountriesTable />);

  await waitFor(() => {
    expect(screen.queryByText('Loading...')).toBeNull();
  });

  const searchInput = screen.getByTestId('global-input');
  fireEvent.change(searchInput, { target: { value: 'Country 1' } });


  await waitFor(() => {

    expect(screen.getByText('Country 1')).toBeInTheDocument();
    expect(screen.queryByText('Country 2')).toBeNull();
  });


});
