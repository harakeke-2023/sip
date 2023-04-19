import React from 'react'
import { render, screen } from '@testing-library/react'
import Cards from './Cards'
import { StateContext } from '../context/StateContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import '@testing-library/jest-dom'

test('it should fetch cards when the component mounts', () => {
  const fetchCards = jest.fn()
  render(
    <StateContext>
      <DndProvider backend={HTML5Backend}>
        <Cards categoryId={1} userId={1} fetchCards={fetchCards} />
      </DndProvider>
    </StateContext>
  )
  expect(fetchCards).toHaveBeenCalledWith(1, expect.any(Function))
})

// write a test to check that the fetchCards function is called with the correct arguments when the component mounts


// Path: client/components/Cards.tsx
// import React, { useEffect, useState } from 'react'