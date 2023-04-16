import request from 'superagent'
// import { UserData } from '../../models/User'
import { Card } from '../../models/Card'

const rootUrl = '/api/v1/cards'

export async function deleteCard(id: number) {
  const res = request.delete(rootUrl).send({ id })

  return res
}

export function editCard(form: Card): Promise<string[]> {
  return request
    .patch(rootUrl)
    .send(form)
    .then((res) => res.body)
}

export function addCard(form: Card): Promise<string[]> {
  return request
    .post(rootUrl)
    .send(form)
    .then((res) => res.body)
}
