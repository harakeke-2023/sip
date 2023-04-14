import request from 'superagent'
// import { UserData } from '../../models/User'

const rootUrl = '/api/v1/cards'

export async function getCards(user_id: number) {
  const res = await request.get(`${rootUrl}/${user_id}`)
  console.log(res)
  return res.body
}
