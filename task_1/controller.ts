import { type Request, type Response } from 'express'
import { randomBytes } from 'node:crypto'

import config from './config.json'

interface SecretMessage {
  message: string
}

interface SecretKey {
  secretKey: string
}

export default class SecretController {
  secrets = new Map<string, string>()

  createSecret = (req: Request, res: Response): void => {
    const secretMessage: SecretMessage = req.body
    const generatedKey: string = randomBytes(config.secret_size).toString('hex')

    const secretKey: SecretKey = {
      secretKey: generatedKey
    }

    this.secrets.set(generatedKey, secretMessage.message)
    res.json(secretKey)
  }

  getSecret = (req: Request, res: Response): void => {
    const key = req.params.key
    const response: SecretMessage = {
      message: 'Not Found'
    }

    const secret = this.secrets.get(key)

    if (secret === null || secret === undefined) {
      res.status(404).json(response)
      return
    }

    response.message = secret
    this.secrets.delete(key)
    res.json(response)
  }
}
