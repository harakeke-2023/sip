import request from 'superagent'
import { UserData } from '../../models/User'
import { CategoryData } from '../../models/Category'

const rootUrl = '/api/v1/categories'

export function addCategory(form: CategoryData): Promise<string[]> {
  return request.post(rootUrl).send(form).then((res) => res.body)
}

export function deleteCategory(form: CategoryData): Promise<string[]> {
  return request.delete(rootUrl).send(form).then((res) => res.body)
}

export function editCategory(form: CategoryData): Promise<string[]> {
  return request.patch(rootUrl).send(form).then((res) => res.body)
}