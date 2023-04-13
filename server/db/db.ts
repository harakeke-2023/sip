import connection from './connection'
import { CombinedData } from '../../models/CombinedData'

export function checkUser(email: string, db = connection) {
  return db('users').where('email', email).select()
}

export function getData(
  dbName: 'users' | 'categories' | 'cards',
  userId: number,
  db = connection
): Promise<CombinedData[]> {
  if (dbName === 'users') {
    return db('users').where('id', userId).select()
  }
  return db(dbName).where('user_id', userId).select()
}

export function deleteData(
  dbName: 'categories' | 'cards',
  id: number,
  db = connection
): Promise<any[]> {
  if (dbName === 'categories') {
    // Delete cards first, then delete the category
    return Promise.all([
      db('cards').select().where('category_id', id).delete(),
      db(dbName).where('id', id).delete(),
    ])
  } else {
    // Delete the item directly
    return db(dbName).where('id', id).delete()
  }
}

export function addData(
  dbName: 'users' | 'categories' | 'cards',
  data: CombinedData,
  db = connection
): Promise<number[]> {
  return db(dbName).insert(data)
}

// check what front end is sending us and update/remove the id parameter accordingly
export function updateData(
  dbName: 'users' | 'categories' | 'cards',
  id: number,
  data: CombinedData,
  db = connection
): Promise<number> {
  return db(dbName).where('id', id).update(data)
}
