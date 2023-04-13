import express from 'express'

import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const data = await db.getData('cards')
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

router.delete('/', async (req, res) => {
  const id = req.body.id
  try {
    const data = await db.deleteData('cards', id)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

router.post('/', async (req, res) => {
  const newData = req.body
  try {
    const data = await db.addData('cards', newData)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

router.patch('/', async (req, res) => {
  const newData = req.body
  const id = req.body.id
  try {
    const data = await db.updateData('cards', id, newData)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

export default router