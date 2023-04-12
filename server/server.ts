import express from 'express'
import path from "path"
import { join } from 'node:path'

import fruitRoutes from './routes/fruits'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/fruits', fruitRoutes)
server.get('*', (req, res) => {
  const appPath = path.join(__dirname, 'public', 'index.html')
  res.sendFile(appPath)
})

export default server
