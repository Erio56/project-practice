import express, { type Express, type Request, type Response } from 'express'
import { randomBytes } from 'node:crypto'

import config from './config.json'

const app: Express = express()
const port = config.server_port
app.use(express.json())

interface SecretMessage {
  message: string
}

interface SecretKey {
  secretKey: string
}

const secrets = new Map<string, string>() // repace with a map

app.post('/api/secrets', (req: Request, res: Response) => {
  const secretMessage: SecretMessage = req.body
  const generatedKey: string = randomBytes(config.secret_size).toString('hex')

  const secretKey: SecretKey = {
    secretKey: generatedKey
  }
  secrets.set(generatedKey, secretMessage.message)

  res.status(200).json(secretKey)
})

app.get('/api/secrets/:key', (req: Request, res: Response) => {
  const key = req.params.key
  const response: SecretMessage = {
    message: 'Not Found'
  }

  const secret = secrets.get(key)

  if (secret === null || secret === undefined) {
    res.status(404).json(response)
    return
  }

  response.message = secret
  secrets.delete(key)
  res.status(200).json(response)
})

app.listen(port, () => {
  console.log(`running in port ${port}.`)
})

export default app
