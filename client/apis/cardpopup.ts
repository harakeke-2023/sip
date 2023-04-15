import request from 'superagent'
// import { UserData } from '../../models/User'
import { Card } from '../../models/Card'

const rootUrl = '/api/v1/categories'

export function deleteCard(form: Card): Promise<string[]> {
  return request
    .delete(rootUrl)
    .send(form)
    .then((res) => res.body)
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
