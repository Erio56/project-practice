import express, { type Express } from 'express'
import SecretController from './controller'

import config from './config.json'

const app: Express = express()
const port = config.server_port
app.use(express.json())

const controller = new SecretController()

app.post('/api/secrets', controller.createSecret)

app.get('/api/secrets/:key', controller.getSecret)

app.listen(port, () => {
  console.log(`running in port ${port}.`)
})

export default app
