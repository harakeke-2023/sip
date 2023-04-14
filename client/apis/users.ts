import request from 'superagent'
import { UserData } from '../../models/User'

const rootUrl = '/api/v1/users'

export function findUser(email: string): Promise<string[]> {
  return request.get(`${rootUrl}/email/${email}`).then((res) => res.body)
}

export async function addUser(user: UserData): Promise<any> {
  const result = await request.post(rootUrl).send(user)
  const userDetail = await request.get(`${rootUrl}/${result.body[0]}`)
  return userDetail.body
}
