import request from 'superagent'
import { Card, CardData } from '../../models/Card'
// import { UserData } from '../../models/User'

const rootUrl = '/api/v1/cards'

export async function getCards(category_id: number) {
  const res = await request.get(`${rootUrl}/${category_id}`)
  return res.body
}

export async function updateCard(card: Card | CardData) {
  const res = await request.patch(`${rootUrl}`).send(card)

  return res.body
}

export async function getCard(id: number) {
  const res = await request.get(`${rootUrl}/card/${id}`)
  return res.body
}

export async function addNewCard(form: CardData) {
  const res = await request.post(rootUrl).send(form)
  return res.body
}

