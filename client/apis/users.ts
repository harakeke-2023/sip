import request from 'superagent'
import { UserData } from '../../models/User'

const rootUrl = '/api/v1/users'



export function findUser(email: string): Promise<string | boolean> {
  return request.post(rootUrl+"/find").send(email).then(res => res.body)
}

export function addUser(user: UserData): Promise<any> {
  return request.post(rootUrl+"/add").send(user).then(res => res.body)
}