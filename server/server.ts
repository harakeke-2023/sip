import express from 'express'
import path from 'path'
import { join } from 'node:path'

import categories from './routes/categories'
import authRoutes from './routes/auth'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/categories', categories)
server.use('api/v1/auth', authRoutes)
server.get('*', (req, res) => {
  const appPath = path.join(__dirname, 'public', 'index.html')
  res.sendFile(appPath)
})

export default server
