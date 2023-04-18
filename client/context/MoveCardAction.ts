export interface MoveCardAction {
  type: 'MOVE_CARD'
  payload: {
    cardId: number
    oldCategoryId: number
    newCategoryId: number
  }
}
