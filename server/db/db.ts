import connection from './connection'
import { CombinedData } from '../../models/CombinedData'

export function getData(
  dbName: 'users' | 'categories' | 'cards',
  db = connection
): Promise<CombinedData[]> {
  return db(dbName).select()
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
