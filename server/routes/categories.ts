import express from 'express'

import * as db from '../db/db'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    const userId = Number(req.params.id)
    const data = await db.getData('categories', userId)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

router.delete('/', async (req, res) => {
  const id = req.body.id
  try {
    const data = await db.deleteData('categories', id)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

router.post('/', async (req, res) => {
  const newData = req.body
  try {
    const data = await db.addData('categories', newData)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

router.patch('/', async (req, res) => {
  const newData = req.body
  const id = req.body.id
  try {
    const data = await db.updateData('categories', id, newData)
    res.json(data)
  } catch (error) {
    res.status(500).send(console.error(error))
  }
})

export default router
