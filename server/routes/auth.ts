import express from 'express'
// import { Fruit, FruitSnakeCase } from '../../models/fruit'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'
import { requiresAuth } from 'express-openid-connect'

// import {
//   getFruits,
//   addFruit,
//   deleteFruit,
//   updateFruit,
//   userCanEdit,
// } from '../db/fruits'

const router = express.Router()


// router.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });


// A public endpoint that anyone can access
// GET /api/v1/fruits
router.get('/', (req, res) => {
 

})



router.post('/', checkJwt, (req: JwtRequest, res) => {
  const { fruit } = req.body
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }


})



router.put('/', checkJwt, (req: JwtRequest, res) => {
  const { fruit } = req.body
  const auth0Id = req.auth?.sub
  const fruitToUpdate = {
    id: fruit.id,
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach,
  }

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

})



router.delete('/:id', (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

})

export default router
