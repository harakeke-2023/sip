import * as db from './db'
import config from './knexfile'
import knex from 'knex'

const testDB = knex(config.test)

beforeAll(() => {
  return testDB.migrate.latest()
})

beforeEach(() => {
  return testDB.seed.run()
})

describe('db functions', () => {
  test('should find the correct user based on email', async () => {
    const user = await db.checkUser('may.con.fa@hotmail.com', testDB)

    expect(user).toHaveLength(1)
    expect(user[0].name).toBe('Maycon')
    expect(user[0].username).toBe('maycon_assis')
    expect(user[0].email).toBe('may.con.fa@hotmail.com')
  })

  test('should get users data based on the id', async () => {
    const user = await db.getData('users', 1, testDB)

    expect(user).toHaveLength(1)
    expect(user[0].name).toBe('Jiho Park')
    expect(user[0].id).toBe(1)
  })

  test('should get the cards for a specific category', async () => {
    const cards = await db.getData('cards', 2, testDB)

    expect(cards).toHaveLength(6)
    expect(cards[0].name).toBe('Drink water')
    expect(cards[0].completed).toBe(0)
    expect(cards[0].comp_count).toBe(0)
    expect(cards[0].total_count).toBe(0)
  })

  test('should get all the categories for a specific user', async () => {
    const cards = await db.getData('categories', 1, testDB)

    expect(cards).toHaveLength(4)
    expect(cards[0].name).toBe('Finances')
    expect(cards[0].description).toBe('Save money')
    expect(cards[1].name).toBe('Fitness')
    expect(cards[1].description).toBe('Stay healthy and fit')
    expect(cards[2].name).toBe('Career')
    expect(cards[3].name).toBe('Learning')
  })
  test('should delete all the cards first then the parent category', async () => {
    const value = await db.deleteData('categories', 1, testDB)

    expect(value).toHaveLength(2)
    expect(value[0]).toBe(5)
    expect(value[1]).toBe(1)
  })
  test('should add a new user', async () => {
    const newUser = {
      id: 20,
      name: 'John',
      username: 'jb',
      email: 'john@gmail.com',
    }
    const value = await db.addData('users', newUser, testDB)

    expect(value).toHaveLength(1)
    expect(value[0]).toBeTruthy()
    expect(value[0]).toBe(newUser.id)
  })
  test('should add a new category', async () => {
    const newCategory = {
      id: 30,
      user_id: 2,
      name: 'Guitar playing',
      description: 'Improve my guitar playing skills',
    }
    const value = await db.addData('categories', newCategory, testDB)

    expect(value).toHaveLength(1)
    expect(value[0]).toBeTruthy()
    expect(value[0]).toBe(newCategory.id)
  })

  test('should add a new Card', async () => {
    const newCard = {
      id: 40,
      category_id: 2,
      user_id: 2,
      name: 'Learn a new song everyday',
      description: 'Only manageable songs',
      date_created: 198477774,
      period: 987444,
      location: 'Studio',
      completed: false,
      total_count: 0,
      comp_count: 0,
    }
    const value = await db.addData('cards', newCard, testDB)

    expect(value).toHaveLength(1)
    expect(value[0]).toBeTruthy()
    expect(value[0]).toBe(newCard.id)
  })

  test('should update a user', async () => {
    const data = {
      id: 3,
      name: 'Maycon',
      username: 'mayconAssis22',
      email: 'may.con.fa@hotmail.com',
    }

    const value = await db.updateData('users', 3, data, testDB)
    expect(value).toBeTruthy()
    expect(value).toBe(1)
  })

  test('should update a category', async () => {
    const data = {
      id: 1,
      user_id: 1,
      name: 'Finances',
      description: ' Dont save money',
    }
    const value = await db.updateData('categories', 1, data, testDB)
    expect(value).toBeTruthy()
    expect(value).toBe(1)
  })

  test('should update a card', async () => {
    const data = {
      id: 2,
      category_id: 2,
      user_id: 2,
      name: 'Drink less water',
      description: 'Drink 2L of water every day',
      date_created: 1660694092000,
      period: 86400000,
      location: 'Everywhere',
      completed: true,
      total_count: 5,
      comp_count: 10,
    }

    const value = await db.updateData('cards', 2, data, testDB)
    expect(value).toBeTruthy()
    expect(value).toBe(1)
  })

  test('should get the data of a specific card', async () => {
    const cards = await db.getCardData(2, testDB)

    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveProperty('name')
    expect(cards[0]).toHaveProperty('description')
    expect(cards[0].name).toBe('Drink water')
  })

  test('should get the cards using user_id', async () => {
    const cards = await db.getCardDataByUserId(2, testDB)

    expect(cards).toHaveLength(6)
    expect(cards[0]).toHaveProperty('name')
    expect(cards[0]).toHaveProperty('description')
    expect(cards[0].name).toBe('Drink water')
  })
})
