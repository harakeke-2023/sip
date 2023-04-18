import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('should render the search bar input element', () => {
    render(<SearchBar />);
    const searchBarInput = screen.getByPlaceholderText('Search Cards...');
    expect(searchBarInput).toBeInTheDocument();
  });

  it('should update the search state when user types in the search input', () => {
    const setSearchMock = jest.fn();
    const useStateContextMock = () => ({ search: '', setSearch: setSearchMock });
    jest.spyOn(React, 'useContext').mockImplementation(useStateContextMock);

    render(<SearchBar />);
    const searchBarInput = screen.getByPlaceholderText('Search Cards...');
    fireEvent.change(searchBarInput, { target: { value: 'test search' } });

    expect(setSearchMock).toHaveBeenCalledWith('test search');
  });

  it('should clear the search input when the form is submitted', () => {
    const setSearchMock = jest.fn();
    const useStateContextMock = () => ({ search: 'test search', setSearch: setSearchMock });
    jest.spyOn(React, 'useContext').mockImplementation(useStateContextMock);

    render(<SearchBar />);
    const searchBarInput = screen.getByPlaceholderText('Search Cards...');
    const searchBarForm = screen.getByRole('form');
    fireEvent.submit(searchBarForm);

    expect(setSearchMock).toHaveBeenCalledWith('');
    expect(searchBarInput).toHaveValue('');
  });
});
