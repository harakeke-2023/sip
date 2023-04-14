import request from 'superagent'
// import { UserData } from '../../models/User'

const rootUrl = '/api/v1/categories'

export function findCategories(userId: number): Promise<string[]> {
  return request.get(`${rootUrl}/${userId}`).then((res) => res.body)
}

// export async function addUser(user: UserData): Promise<any> {
//   const result = await request.post(rootUrl).send(user)
//   const userDetail = await request.get(`${rootUrl}/${result.body[0]}`)
//   return userDetail.body
// }
