import request from 'superagent'
import { UserData } from '../../models/User'
import { Category, CategoryData } from '../../models/Category'

const rootUrl = '/api/v1/categories'

export function addCategory(form: CategoryData): Promise<string[]> {
  return request.post(rootUrl).send(form).then((res) => res.body)
}

export function deleteCategory(id: number): Promise<string[]> {
  return request.delete(rootUrl).send({id}).then((res) => res.body)
}

export function editCategory(form: Category): Promise<string[]> {
  return request.patch(rootUrl).send(form).then((res) => res.body)
}