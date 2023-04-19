import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBar from './SearchBar'
import React from 'react'
import { StateContext } from '../context/StateContext'

describe('SearchBar', () => {
  it('should render the search bar input element', () => {
    render(
      <StateContext>
        <SearchBar />
      </StateContext>
    )
    const searchBarInput = screen.getByPlaceholderText('Search Cards...')
    const searchBar = screen.getByLabelText('Search')
    expect(searchBar).toBeInTheDocument()
    expect(searchBarInput).toBeInTheDocument()
  })

  it('should update the search state when user types in the search input', () => {
    const setSearchMock = jest.fn()
    const useStateContextMock = () => ({ search: '', setSearch: setSearchMock })
    jest.spyOn(React, 'useContext').mockImplementation(useStateContextMock)

    render(<SearchBar />)
    const searchBarInput = screen.getByPlaceholderText('Search Cards...')
    fireEvent.change(searchBarInput, { target: { value: 'test search' } })

    expect(setSearchMock).toHaveBeenCalledWith('test search')
  })
})
