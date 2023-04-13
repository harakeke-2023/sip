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

export default router
