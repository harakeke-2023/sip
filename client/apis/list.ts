import request from 'superagent'
import { CategoryData } from '../../models/Category'
// import { UserData } from '../../models/User'

const rootUrl = '/api/v1/categories'

export function findCategories(userId: number): Promise<string[]> {
  return request.get(`${rootUrl}/${userId}`).then((res) => res.body)
}

export function addCategory(form: CategoryData): Promise<string[]> {
  return request.post(rootUrl).send(form).then((res) => res.body)
}

export function editCategory(form: CategoryData): Promise<string[]> {
  return request.post(rootUrl).send(form).then((res) => res.body)
}

























// export function deleteCategory(form: CategoryData): Promise<string[]> {
//   return request.delete(rootUrl).send(form).then((res) => res.body)
// }
//
// export function editCategory(form: Category): Promise<string[]> {
//   return request.patch(rootUrl).send(form).then((res) => res.body)
// }

// export async function findCategories(userId: number): Promise<any> {
//   const result = await request.get(`${rootUrl}/${userId}`)
//   return result.body
// }

// export async function deleteCategory(id: number): Promise<any> {
//   const result = await request.delete(rootUrl).send(id)
//   return result.body
// }

// export async function editCategory(form: Category): Promise<any> {
//   const result = await request.patch(rootUrl).send(form)
//   return result.body
// }

// export async function findUser(id: number): Promise<any> {
//   const result = await request.get(`${rootUrl}/${id}`)
//   return result.body
// }
// export async function addUser(user: UserData): Promise<any> {
//   const result = await request.post(rootUrl).send(user)
//   const userDetail = await request.get(`${rootUrl}/${result.body[0]}`)
//   return userDetail.body
// }


