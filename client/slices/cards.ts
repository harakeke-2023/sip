import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Card, CardData } from '../../models/Card'
import { getCardsbyUserId } from '../apis/cards'

export const fetchCards = createAsyncThunk(
  'cards/fetchCards',
  async (id: number) => {
    const cards = await getCardsbyUserId(id)
    console.log('fetchy', cards)
    return cards
  }
)

const cardsSlice = createSlice({
  name: 'cards',
  initialState: [] as Card[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCards.fulfilled,
      (state, action: PayloadAction<Card[]>) => {
        return action.payload
      }
    )
  },
})

export default cardsSlice.reducer
