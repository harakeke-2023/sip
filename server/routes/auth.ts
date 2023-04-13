import express from 'express'
// import { Fruit, FruitSnakeCase } from '../../models/fruit'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'
import { requiresAuth } from 'express-openid-connect'


const router = express.Router()





router.get('/', (req, res) => {
 

})



router.post('/', checkJwt, (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }


})



router.put('/', checkJwt, (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub

  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

})



router.delete('/:id', (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) {
    console.error('No auth0Id')
    return res.status(401).send('Unauthorized')
  }

})

export default router
